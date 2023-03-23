import { sequelize, DataTypes } from "../db/config"

const NoteModel = sequelize.define("notes", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
})

export default NoteModel
