import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategoryEntity1727541419126 implements MigrationInterface {
    name = 'UpdateCategoryEntity1727541419126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories " DROP CONSTRAINT "FK_9ff8f8047166b6509b59071dc58"`);
        await queryRunner.query(`ALTER TABLE "categories " DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "categories " ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "categories " ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "categories " ADD CONSTRAINT "FK_24ed132362131674ee4c9969c24" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories " DROP CONSTRAINT "FK_24ed132362131674ee4c9969c24"`);
        await queryRunner.query(`ALTER TABLE "categories " DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "categories " DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories " ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "categories " ADD CONSTRAINT "FK_9ff8f8047166b6509b59071dc58" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
