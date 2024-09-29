import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTBLReviews1727641044876 implements MigrationInterface {
    name = 'UpdateTBLReviews1727641044876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "user" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "product" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_fa38d47686f495a66f152c46e2b" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_978e9062da82d669c78c85dc0be" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_978e9062da82d669c78c85dc0be"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_fa38d47686f495a66f152c46e2b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "product"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
