import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTabCategory1727540892982 implements MigrationInterface {
  name = 'AddTabCategory1727540892982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories " ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "UQ_b84f98830042f1c3b2194eb2605" UNIQUE ("name"), CONSTRAINT "PK_53a4f59f71f809198ed003424e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories " ADD CONSTRAINT "FK_9ff8f8047166b6509b59071dc58" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories " DROP CONSTRAINT "FK_9ff8f8047166b6509b59071dc58"`,
    );
    await queryRunner.query(`DROP TABLE "categories "`);
  }
}
