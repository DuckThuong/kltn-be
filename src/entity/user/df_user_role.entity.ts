import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { DfUser } from "./df_user.entity";
import { DfRole } from "./df_role.entity";

@Entity('dto_df_user_role')
export class DfUserRole {
    @PrimaryColumn({ type: 'bigint', name: 'USER_ID' })
    USER_ID: number;

    @PrimaryColumn({ type: 'bigint', name: 'ROLE_ID' })
    ROLE_ID: number;

    @ManyToOne(() => DfUser, user => user.userRoles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'USER_ID' })
    user: DfUser;

    @ManyToOne(() => DfRole, role => role.userRoles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ROLE_ID' })
    role: DfRole;
}