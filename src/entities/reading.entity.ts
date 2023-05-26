import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

@Entity({ name: "readings" })
export class ReadingEntity {
    @PrimaryGeneratedColumn()
    readingId!: number;

    @Column("integer")
    markerId!: number;

    @Column("timestamp with time zone")
    @CreateDateColumn()
    timestamp!: Date;

    @Column({ type: "double precision", nullable: true, default: null })
    temperature!: null | number;

    @Column({ type: "double precision", nullable: true, default: null })
    porePressure!: null | number;
}
