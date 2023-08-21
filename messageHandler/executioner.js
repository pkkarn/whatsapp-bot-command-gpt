const { chatGpt } = require('../modules/gpt')
const UserSchema = require('../schema/userSchema')
const TaskSchema = require('../schema/taskSchema')
exports.gptExecute = async (message) => {
    const response = await chatGpt(message.body.split(' ').slice(1).join(' '))
    message.reply(`Result📃:\n\n${response}`)
}

const createAndFetchUser = async (message) => {
    const userId = message._data.id.remote;
    const username = message._data.notifyName
    const user = await UserSchema.findOneAndUpdate(
        { user_id: userId },
        {
            $setOnInsert: { // This ensures that these fields are only set on an insert, not an update
                user_id: userId, 
                username: username 
            }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return user
}

const extractPoints = (message) => {
    const points_message = message.body.split(' ')
    if(points_message.length > 2) {
        throw new Error('Not valid commnd')
    } else {
        const points = Number(points_message[1].trim())
        if(typeof points ==='number') {
            return points
        } else {
            throw new Error('Not a Number')
        }
    }
}


exports.taskExecute = async (message) => {
    try {
        const user = await createAndFetchUser(message);
        if(user) {            
            await TaskSchema.create({
                description: message.body.split(' ').slice(1).join(',', ' '),
                author: user._id
            })
    
            message.reply(`Task has been updated, and your current point is (⭐${user.points})`)
        }
    } catch(err) {
        message.reply(`error: ${err.message}`)
    }
}


exports.addPoints = async (message) => {
    try {
        const user = await createAndFetchUser(message);
        if(user) {
            const points =  extractPoints(message)

            const updatedPointsUser = await UserSchema.findOneAndUpdate(
                { _id: user._id },
                { points: user.points + points},
                { new: true }
            )

            message.reply(`Your updated points are: (⭐${updatedPointsUser.points})`)
        }
    } catch(err) {
        message.reply(`error: ${err.message}`)
    }
}

exports.minusPoints = async (message) => {
    try {
        const user = await createAndFetchUser(message);
        if(user) {
            const points =  extractPoints(message)

            const updatedPointsUser = await UserSchema.findOneAndUpdate(
                { _id: user._id },
                { points: user.points - points},
                { new: true }
            )

            message.reply(`Your updated points are: (⭐${updatedPointsUser.points})`)
        }
    } catch(err) {
        message.reply(`error: ${err.message}`)
    }
}