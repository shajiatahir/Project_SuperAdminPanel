const Joi = require('joi');

exports.validateAdminData = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
        firstName: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(50)
            .messages({
                'string.min': 'First name must be at least 2 characters long',
                'string.max': 'First name cannot exceed 50 characters',
                'any.required': 'First name is required'
            }),
        lastName: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(50)
            .messages({
                'string.min': 'Last name must be at least 2 characters long',
                'string.max': 'Last name cannot exceed 50 characters',
                'any.required': 'Last name is required'
            })
    });

    return schema.validate(data);
}; 