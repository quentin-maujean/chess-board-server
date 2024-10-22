import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addPiecesTable1729605924160 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pieces',
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
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'position',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'player_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['player_id'],
                    referencedTableName: 'players',
                    referencedColumnNames: ['id'],
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pieces');
    }
}