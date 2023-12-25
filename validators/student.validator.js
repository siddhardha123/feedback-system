

const isValidGetFormsWithTag = (body) => {
    const schema = Joi.object({
        tagId: Joi.string().required()
    });
    return schema.validate(body);
}
