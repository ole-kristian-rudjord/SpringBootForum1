function validateTitle(inputValue) {
    const regex = /^[0-9a-zA-ZæøåÆØÅ. \-]{3,20}$/;
    const ok = regex.test(inputValue);
    let result;
    if (!ok) {
        if (inputValue.length < 3) {
            result = 'Title must be longer than 3 characters';
        } else if (inputValue.length > 20) {
            result = 'Title must be shorter than 20 characters';
        } else {
            result = 'Title must contain normal characters and numbers';
        }
    } else {
        result = '';
    }
    $('#title-validation-span').html(result);
    return ok;
}

function validateContent(inputValue) {
    const regex = /^[0-9a-zA-ZæøåÆØÅ. \-]{5,510}$/;
    const ok = regex.test(inputValue);
    let result;
    if (!ok) {
        if (inputValue.length < 5) {
            result = 'Content must be longer than 5 characters';
        } else if (inputValue.length > 510) {
            result = 'Content must be shorter than 510 characters';
        } else {
            result = 'Content must contain normal characters and numbers';
        }
    } else {
        result = '';
    }
    $('#content-validation-span').html(result);
    return ok;
}

function validateTitleAndContent() {
    const titleOK = validateTitle($('.title-input').val());
    const contentOK = validateContent($('.content-input').val());
    if (titleOK && contentOK) {
        return true;
    }
    return false;
}