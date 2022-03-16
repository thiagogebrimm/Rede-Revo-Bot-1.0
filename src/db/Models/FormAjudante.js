const { DataTypes, Model } = require('sequelize');

module.exports = class FormAjudante extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            pergunta01: { type: DataTypes.STRING },
            pergunta02: { type: DataTypes.STRING },
            pergunta03: { type: DataTypes.STRING },
            pergunta04: { type: DataTypes.STRING },
            pergunta05: { type: DataTypes.STRING },
            pergunta06: { type: DataTypes.STRING },
            pergunta07: { type: DataTypes.STRING },
            pergunta08: { type: DataTypes.STRING },
            pergunta09: { type: DataTypes.STRING },
            pergunta10: { type: DataTypes.STRING },
            messageId: { type: DataTypes.STRING },
            messageId2: { type: DataTypes.STRING },
            messageId3: { type: DataTypes.STRING },
            autor: { type: DataTypes.STRING },
            resolved: { type: DataTypes.BOOLEAN },


        }, {
            tableName: 'FormAjudante',
            timestamps: true,
            sequelize
        });
    }
}