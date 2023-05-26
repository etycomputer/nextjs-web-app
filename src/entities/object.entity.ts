import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "objects" })
export class ObjectEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    objectId!: number;

    @Column({ type: "integer", default: 1 })
    type!: number;

    @Column({ type: "text", unique: true })
    serial!: string;

    @Column({ name: "hole_id", type: "integer", default: -1 })
    holeId!: number;
}
