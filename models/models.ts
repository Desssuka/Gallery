import sequelize from '../db'
import { DataTypes, Model, Optional } from 'sequelize'

interface UserAttributes {
    id: number
    email: string
    username: string
    password: string
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
        createdAt?:Date,
        updatedAt?:Date
    }

    
export const User = sequelize.define<UserInstance>('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    username: {type: DataTypes.STRING, unique: true, allowNull:false},
    password: {type: DataTypes.STRING, allowNull: false},
})

interface PostAttributes {
    id: number
    description: string
    img: string
    userId: number
    author: string
}
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

interface PostInstance extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {
        createdAt?:Date,
        updatedAt?:Date
    }

export const Post = sequelize.define<PostInstance>('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, defaultValue: ''},
    img: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    author: {type: DataTypes.STRING, allowNull:false}
})

User.hasMany(Post, {
    foreignKey:"userId"
})
Post.belongsTo(User)