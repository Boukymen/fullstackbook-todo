import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTodosTable1681310066834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists todos
            (
                id        bigserial primary key,
                name      text,
                completed boolean not null default false
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists todos;`);
    }

}
