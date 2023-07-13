import React from 'react';
export type Field = {
  name: string;
  label: string;
  required?: boolean;
  type: 'text' | 'number';
};

const ContactFormExample: React.FC<{
  recipientId: string;
  fields: Field[];
}> = ({ fields = [], recipientId }) => {
  return (
    <form
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        const formProps = Object.fromEntries(formData);
        alert(`would send contact form to ${recipientId}.\n
${Object.keys(formProps)
  .map((key) => `${key}: ${formProps[key]}`)
  .join('\n')}
        `);
        e.preventDefault();
      }}
      style={{
        border: '1px solid black',
        padding: 10,
      }}
    >
      {fields.map((field, index) => (
        <label key={field.name ?? index}>
          {field.label} {field.required ? '*' : ''}
          <br />
          <input
            type={field.type}
            required={field.required}
            name={field.name}
          />
          <br />
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactFormExample;
