module.exports.filledForm = `
<form id="form" action="">
    <input value="my_email" data-field-name="email" data-field-type="text" type="text">
    <div data-field-name="country" data-field-type="multipleSelect" >
        <input id="rus" value="russia" type="checkbox" checked>
        <label for="rus">russia</label>

        <input id="can" value="canada" type="checkbox" >
        <label for="can">canada</label>

        <input id="usa" value="usa" type="checkbox" checked>
        <label for="usa">usa</label>
    </div>
    <input data-field-name="rememberMe" data-field-type="singleSelect" type="checkbox" checked>

    <button > test </button>
</form>
`;
