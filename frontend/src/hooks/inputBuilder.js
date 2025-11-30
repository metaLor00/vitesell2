import { useState } from 'react';

export default function (initFeilds) {
  const init = {};
  initFeilds.map(function (field) {
    init[field.name] = field;
  });

  const [fields, setFields] = useState(init);

  function handleChanges(e) {
    const { target } = e;

    setFields({
      ...fields,
      [target.name]: {
        ...fields[target.name],
        value: target.value,
      },
    });
  }

  let fieldsElem = initFeilds.map(function (field) {
    return (
      <input
        name={field.name}
        type={field.type}
        value={field.value ? field.value : null}
        onChange={handleChanges}
        onClick={handleChanges}
        onBlur={handleChanges}
        placeholder={field.placeholder ? field.placeholder : ''}
        required={field.required ? field.required : false}
      />
    );
  });

  return [fields, fieldsElem];
}
