import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addMovesTable1729605924160 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'moves',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'from_position',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'to_position',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'is_valid',
                    type: 'boolean',
                    isNullable: false,
                },
                {
                    name: 'move_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'piece_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['piece_id'],
                    referencedTableName: 'pieces',
                    referencedColumnNames: ['id'],
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('moves');
    }
}