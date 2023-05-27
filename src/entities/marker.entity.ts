// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     CreateDateColumn,
// } from "typeorm";

// @Entity({ name: "markers" })
// export class MarkerEntity {
//     @PrimaryGeneratedColumn({ name: "id" })
//     markerId!: number;

//     @Column({ type: "integer", default: 1 })
//     type!: number;

//     @Column({ type: "text", unique: true })
//     serial!: string;

//     @Column({ name: "hole_id", type: "integer", default: -1 })
//     holeId!: number;

//     @Column("integer")
//     subnet!: number;

//     @Column("integer")
//     node!: number;

//     @Column({ type: "boolean", default: false })
//     activated!: boolean;

//     @Column({ name: "activation_time", type: "timestamp with time zone", nullable: true, default: null })
//     @CreateDateColumn()
//     activationTime!: null | Date;
// }
