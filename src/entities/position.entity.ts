import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

@Entity({ name: "positions" })
export class PositionEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    positionId!: number;

    @Column({ name: "object_id", type: "integer" })
    objectId!: number;

    @Column("double precision")
    x!: number;

    @Column("double precision")
    y!: number;

    @Column("double precision")
    z!: number;

    @Column({ name: "time", type: "timestamp with time zone" })
    @CreateDateColumn()
    created_at!: Date;
}
