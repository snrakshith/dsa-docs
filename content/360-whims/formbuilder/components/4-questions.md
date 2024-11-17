---
title: "Question"
description: "An overview of Question Component"
---

### **Code Documentation: Question Component**

- Key Components and Structure

#### 1. **Question Header Section**

```jsx
<div className="d-flex w-100">
  <div className={`fs-2 form-label mb-5 ${values.sections[`${sectionIndex}`].questions[`${index}`].questionRequired === true ? "required" : null}`}>Question {index + 1}</div>
  <div
    style={{
      position: "relative"
    }}
    {...provided.dragHandleProps}>
    <i
      style={{
        position: "absolute",
        left: "400px",
        cursor: "move"
      }}
      className="fs-2 fas fa-grip-lines text-muted"></i>
  </div>
</div>
```

- **Purpose:** Displays the question header along with a drag icon for rearranging questions.
- **`className` Handling:** Conditionally applies the `required` class if the question is marked as required.
- **Drag and Drop:**
  - Uses `provided.dragHandleProps` to enable draggable functionality.
  - The **icon** (`fa-grip-lines`) helps users visually identify draggable items.

---

#### 2. **Question Input Section**

```jsx
<div className="d-flex fv-row h-60px">
  {/* Question Name */}
  <div className="fv-row col-lg-8">
    <Field
      name={`sections[${sectionIndex}].questions[${index}].questionName`}
      placeholder="Enter the question"
      className="form-control form-control-lg form-control-solid"
    />
    <div className="text-danger mb-5">
      <ErrorMessage
        name={`sections[${sectionIndex}].questions[${index}].questionName`}
      />
    </div>
  </div>
```

- **Question Input:**
  - Renders a text field using `Formik`'s `<Field>` component for entering the question.
  - If validation fails, **`ErrorMessage`** displays error messages in red (`text-danger`).

---

#### 3. **Question Type Selector**

```jsx
<div className="fv-row w-450px ms-5">
  <Field as="select" name={`sections[${sectionIndex}].questions[${index}].questionType`} className="form-select form-select-lg form-select-solid cursor-pointer">
    <option value="TextField">TextField</option>
    <option value="Date">Date</option>
    <option value="Image">Image</option>
    <option value="Dropdown">Dropdown</option>
    <option value="Checkbox">Checkbox</option>
    <option value="Radio">Radio</option>
  </Field>
  <div className="text-danger mt-2">
    <ErrorMessage name={`sections[${sectionIndex}].questions[${index}].questionType`} />
  </div>
</div>
```

- **Dropdown Menu:**
  - Allows users to select a question type (e.g., TextField, Date, Image).
  - Uses `Formik`'s `<Field>` with `as="select"` to create a dropdown.
  - If validation errors occur, the **error message** is displayed below the dropdown.

---

#### 4. **Hover-based Action Button**

```jsx
{
  hoverEffect && (
    <div
      style={{
        position: "absolute",
        top: "40%",
        right: "-25px"
      }}
      className="card p-5 d-flex align-items-center justify-content-center">
      <i
        onClick={() =>
          push({
            questionName: "",
            questionType: "TextField",
            validations: {
              dataType: "Text",
              minValue: "",
              maxValue: "",
              minLength: "",
              maxLength: ""
            },
            options: [{ option: "" }],
            questionRequired: false,
            descriptionRequired: false
          })
        }
        className="fs-2 fas fa-plus text-hover-primary cursor-pointer"></i>
    </div>
  );
}
```

- **Hover Button:**
  - Displays an **add button** (`fa-plus icon`) on hover, allowing users to add a new question with default configurations.
  - The `push` function from `Formik`'s `FieldArray` is used to append a new question object.

---

#### 5. **Options Management Section**

```jsx
{
  values.sections[`${sectionIndex}`].questions[`${index}`].questionType !== "TextField" && values.sections[`${sectionIndex}`].questions[`${index}`].questionType !== "Date" && values.sections[`${sectionIndex}`].questions[`${index}`].questionType !== "Image" && (
    <FieldArray name={`sections[${sectionIndex}].questions[${index}].options`}>
      {(fieldArrayProps) => {
        const { push, remove, form } = fieldArrayProps;
        const { values } = form;
        return (
          <div className="d-flex flex-column">
            {values.sections[`${sectionIndex}`].questions[`${index}`].options.map((category, valueIndex) => (
              <div className="d-flex mb-5 align-items-center">
                <Field name={`sections[${sectionIndex}].questions[${index}].options[${valueIndex}].option`} placeholder="Enter the value" className="form-control form-control-lg form-control-solid w-500px" />
                <button className="ms-5 btn btn-primary" type="button" onClick={() => push("")}>
                  Add Option
                </button>
                {valueIndex > 0 && (
                  <button className="ms-5 btn btn-danger" type="button" onClick={() => remove(valueIndex)}>
                    Cancel Option
                  </button>
                )}
              </div>
            ))}
          </div>
        );
      }}
    </FieldArray>
  );
}
```

- **Dynamic Options Handling:**
  - **FieldArray** from Formik manages dynamic options for non-text-based question types (e.g., Dropdown, Checkbox).
  - **Add/Remove Buttons:** Users can add or remove options using the `push` and `remove` methods.

---

#### 6. **Description Field (Conditional Rendering)**

```jsx
{
  values.sections[`${sectionIndex}`].questions[`${index}`].descriptionRequired && (
    <div className="d-flex align-items-center mb-5">
      <div className="fv-row col-lg-12">
        <Field name={`sections[${sectionIndex}].questions[${index}].description`} placeholder="Description for the question" className="form-control form-control-lg form-control-solid" />
        <div className="text-danger mt-2">
          <ErrorMessage name="description" />
        </div>
      </div>
    </div>
  );
}
```

- **Conditional Description Field:**
  - If `descriptionRequired` is set to true, a description field is rendered.
  - **Error Handling:** Displays error messages if validation fails.

---

### Dynamic form built using **Formik** with features like **validation**

- **skip logic**
- **conditional rendering**.

1. **Dynamic Validation based on Question Type:**

   - Checks if a question is of type `TextField` and applies validation with minimum and maximum constraints.
   - Uses `Field` and `ErrorMessage` components from `Formik`.

   ```tsx
   <Field as="select" name={`sections[${sectionIndex}].questions[${index}].validations.dataType`} className="form-select form-select-lg form-select-solid">
     <option value="Text" selected>
       Text
     </option>
     <option value="Number">Number</option>
   </Field>
   ```

2. **Skip Logic with FieldArray:**

   - Uses `FieldArray` to handle **conditional questions** dynamically. The user can add or remove conditions based on another question's response.

   ```tsx
   <FieldArray name={`sections[${sectionIndex}].questions[${index}].conditions`}>
     {({ push, remove, form }) =>
       sections[sectionIndex].questions[index].conditions.map((condition, conditionIndex) => (
         <div className="d-flex mb-5">
           <Field as="select" name={`sections[${sectionIndex}].questions[${index}].conditions[${conditionIndex}].questionNumber`} className="form-select">
             <option>Select Question Number</option>
             {questionArray.map((qA) => (
               <option value={qA}>Question {qA}</option>
             ))}
           </Field>
         </div>
       ))
     }
   </FieldArray>
   ```

   **Tip:**
   Consider extracting repetitive logic, like the `select` options, into separate components.

3. **Switches for Control Flags:**

   - Multiple `Switch` components manage different flags (like `Required`, `Conditional`, `Validate`).

   ```tsx
   <Switch id={`sections[${sectionIndex}].questions[${index}].questionRequired`} name={`sections[${sectionIndex}].questions[${index}].questionRequired`} checked={values.sections[sectionIndex].questions[index].questionRequired} onChange={(e, checked) => setFieldValue(`sections[${sectionIndex}].questions[${index}].questionRequired`, checked)} />
   ```

   **Tip:**
   Using a controlled component like `Switch` ensures that the form state is synchronized with user input.

4. **Dynamic Deletion:**

   - Users can delete individual questions or conditions dynamically. This feature is managed through `FieldArray`'s `remove()` function.

   ```tsx
   {
     index > 0 && (
       <span onClick={() => remove(index)}>
         <i className="fs-2 fas fa-trash-alt text-hover-danger cursor-pointer"></i>
         <label className="fs-4 fw-bolder w-100px">Delete</label>
       </span>
     );
   }
   ```
