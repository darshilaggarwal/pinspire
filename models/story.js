const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: {
        url: String,
        type: {
            type: String,
            enum: ['image', 'video'],
            default: 'image'
        }
    },
    textOverlay: {
        text: String,
        position: {
            x: Number,
            y: Number
        },
        style: {
            fontSize: Number,
            color: String,
            backgroundColor: String
        }
    },
    viewers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        viewedAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Virtual for viewer count
storySchema.virtual('viewerCount').get(function() {
    return this.viewers.length;
});

module.exports = mongoose.model('Story', storySchema); 