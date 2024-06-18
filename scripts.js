$(document).ready(function () {
    function resetFormAndHideModal(formId, modalId) {
        $(formId).trigger('reset');
        $(modalId).modal('hide');
    }

    function saveToLocalStorage() {
        let headings = [];
        $('main h1').each(function () {
            let headingId = $(this).attr('id');
            let headingVal = $(this).text().trim();
            headings.push({ id: headingId, value: headingVal });
        });
        localStorage.setItem('headings', JSON.stringify(headings));
    }

    function loadFromLocalStorage() {
        let headings = JSON.parse(localStorage.getItem('headings')) || [];
        headings.forEach(function (heading) {
            $('main').append(`
            <div id="${heading.id}-cont">
                <h1 id="${heading.id}">${heading.value}
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </h1>
            </div>`);
            $(`select[name=heading-form]`).append(`<option value="${heading.value}" data-heading-id="${heading.id}">${heading.value}</option>`);
            $(`select[name=sub-heading-form]`).append(`<option value="${heading.value}" data-heading-id="${heading.id}">${heading.value}</option>`);
        });
    }

    $("#heading-form").submit(function (e) {
        e.preventDefault();
        let heading_val = $(".input-heading").val();
        if (heading_val) {
            let headingId = `heading-${Math.random().toString(36).substr(2, 9)}`;
            $('main').append(`
            <div id="${headingId}-cont">
                <h1 id="${headingId}">${heading_val}
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </h1>
            </div>`);
            $(`select[name=heading-form]`).append(`<option value="${heading_val}" data-heading-id="${headingId}">${heading_val}</option>`);
            $(`select[name=sub-heading-form]`).append(`<option value="${heading_val}" data-heading-id="${headingId}">${heading_val}</option>`);
            saveToLocalStorage();
        }

        resetFormAndHideModal("#heading-form", "#heading");
    });

    loadFromLocalStorage();
});
$("#subheading-form").submit(function (e) {
    e.preventDefault();
    let heading_val1 = $("#sub-select").val();
    let subheading_val = $("#sub-input").val();
    if (subheading_val) {
        let headingId = $(`select[name=heading-form] option:selected`).data('heading-id');
        let subheadingId = `subheading-${Math.random().toString(36).substr(2, 9)}`;
        if (heading_val1 && subheading_val && headingId) {
            $(`#${headingId}-cont`).append(`
                <div id="${subheadingId}-cont">
                    <h4 id="${subheadingId}">
                        ${subheading_val}
                        <button type="button" class="close1" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </h4>
                </div>`);
            $(`select[name=sub-heading2]`).append(`<option value="${subheading_val}" data-subheading-id="${subheadingId}" data-heading-id="${headingId}">${subheading_val}</option>`);

            // Save subheading data to local storage
            saveSubheadingData(headingId, subheadingId, subheading_val);
        }
    }
    resetFormAndHideModal("#subheading-form", '#subheading');
});

function saveSubheadingData(headingId, subheadingId, subheading_val) {
    let subheadings = JSON.parse(localStorage.getItem('subheadings')) || [];
    subheadings.push({ headingId, subheadingId, subheading_val });
    localStorage.setItem('subheadings', JSON.stringify(subheadings));
}

// Function to reset form and hide modal (assuming it exists)
function resetFormAndHideModal(formSelector, modalSelector) {
    $(formSelector)[0].reset();
    $(modalSelector).modal('hide');
}

// Load saved subheadings from local storage on page load
$(document).ready(function () {
    let subheadings = JSON.parse(localStorage.getItem('subheadings')) || [];
    subheadings.forEach(subheading => {
        $(`#${subheading.headingId}-cont`).append(`
            <div id="${subheading.subheadingId}-cont">
                <h4 id="${subheading.subheadingId}">
                    ${subheading.subheading_val}
                    <button type="button" class="close1" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </h4>
            </div>`);
        $(`select[name=sub-heading2]`).append(`<option value="${subheading.subheading_val}" data-subheading-id="${subheading.subheadingId}" data-heading-id="${subheading.headingId}">${subheading.subheading_val}</option>`);
    });
});



    
$("#sample-Form").submit(function (e) {
    e.preventDefault(); // Prevent default form submission

    // Extracting values from the form elements
    let headingId = $('select[name=sub-heading-form] option:selected').data('heading-id');
    let subheadingId = $('select[name=sub-heading2] option:selected').data('subheading-id');
    let inputType = $("#input").val();
    let name = $("#name").val();
    let className = $("#class").val();
    let value = $("#value").val();
    let placeholder = $("#placeholder").val();
    let options = $("#options").val();
    let isReadOnly = $("#readonly").is(':checked');
    let isDisabled = $("#disabled").is(':checked');
    let newField;

    // Creating the new field based on the input type
    switch (inputType) {
        case "text":
            newField = `<input type="text" name="${name}" class="${className}" value="${value}" placeholder="${placeholder}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
            break;
        case "textarea":
            newField = `<textarea name="${name}" class="${className}" placeholder="${placeholder}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>${value}</textarea>`;
            break;
        case "file":
            newField = `<input type="file" name="${name}" class="${className}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
            break;
        case "email":
            newField = `<input type="email" name="${name}" class="${className}" value="${value}" placeholder="${placeholder}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
            break;
        case "checkbox":
            let checkValues = options.split(',').map(opt => opt.trim());
            newField = '';
            checkValues.forEach(opt => {
                newField += `<input type="checkbox" id="${opt}" name="${name}" class="${className}" value="${opt}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}> <label for="${opt}">${opt}</label>`;
            });
            break;
        case "radio":
            let radioValues = options.split(',').map(opt => opt.trim());
            newField = '';
            radioValues.forEach(opt => {
                newField += `<input type="radio" id="${opt}" name="${name}" class="${className}" value="${opt}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}> <label for="${opt}">${opt}</label>`;
            });
            break;
        case "option":
            let optionValues = options.split(',').map(opt => opt.trim());
            newField = `<select name="${name}" class="${className}">`;
            optionValues.forEach(opt => {
                newField += `<option value="${opt}">${opt}</option>`;
            });
            newField += `</select>`;
            break;
        case "submit":
            newField = `<input type="submit" name="${name}" class="${className}" value="${value}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
            break;
        default:
            newField = `<input type="text" name="${name}" class="${className}" value="${value}" placeholder="${placeholder}" ${isReadOnly ? 'readonly' : ''} ${isDisabled ? 'disabled' : ''}>`;
    }

    // Append the new field to the specific container
    if (headingId && subheadingId) {
        $(`#${subheadingId}-conts`).append(`
            <div class="field-container">
                ${newField}
                <button type="button" class="close2" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>`);
    }

    // Save data to local storage
    let formData = {
        headingId: headingId,
        subheadingId: subheadingId,
        inputType: inputType,
        name: name,
        className: className,
        value: value,
        placeholder: placeholder,
        options: options,
        isReadOnly: isReadOnly,
        isDisabled: isDisabled
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    // Reset form and hide modal
    resetFormAndHideModal("#sample-Form", '#form');
});


    //subheading dropdown based on select heading//
    $("#selectfield").change(function () {
        let headingId = $(this).find('option:selected').data('heading-id');
        if (headingId) {
            let subheadings = $(`#${headingId}-cont h4`);
            $("#subheadselect").empty().append('<option value="" disabled selected>Choose a sub-heading</option>');
            subheadings.each(function () {
                let subheadingText = $(this).text();
                let subheadingId = $(this).attr('id');
                $("#subheadselect").append(`<option value="${subheadingText}" data-subheading-id="${subheadingId}" data-heading-id="${headingId}">${subheadingText}</option>`);
            });
        }
    });
    $(document).on("click", ".close", function () {
        let containerId = $(this).closest('div').attr('id');
        $(`#${containerId}`).remove();

    });








  


