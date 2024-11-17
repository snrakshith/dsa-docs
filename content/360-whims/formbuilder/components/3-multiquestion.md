---
title: "MultiQuestion"
description: "An overview of MultiQuestion Component"
---

## MultiQuestion Component Documentation

### **Description**

The `MultiQuestion` component dynamically manages a list of questions within a section of a form using **Formik's `FieldArray`**. It allows users to add, remove, and edit questions through child components. It provides flexibility for question management inside each section and integrates error handling.

---

### **Props**

| Prop           | Type  | Description                                          |
| -------------- | ----- | ---------------------------------------------------- |
| `sectionIndex` | `any` | Index of the section in which questions are managed. |

---

### **State Variables**

| State      | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `editMode` | `boolean` | Tracks whether the questions are in edit mode. |

---

### **Functionality**

#### **`handleEdit()`**

Toggles the **`editMode`** state to enable or disable question editing.

```js
const handleEdit = () => {
  setEditMode(!editMode);
};
```

---

### **Formik Integration: FieldArray**

The **`FieldArray`** component allows users to add, remove, and manage multiple questions within the form's section.

#### **`FieldArray` Usage**

- **`name`**: Points to the questions array inside a specific section (e.g., `sections[0].questions`).
- **`push`**: Adds a new question to the array.
- **`remove`**: Removes an existing question by index.
- **`form`**: Provides access to Formik's form state, including `values` and `setFieldValue`.

```jsx
<FieldArray name={`sections[${sectionIndex}].questions`}>
  {(QuestionProps) => {
    const { push, remove, form } = QuestionProps;
    const { values, setFieldValue } = form;
    const { sections } = values;
  }}
</FieldArray>
```

---

### **Rendering Logic**

1. **Question Array Generation:**
   A question array is created dynamically based on the current number of questions.

```js
const totalNumberOfQuestions = sections[sectionIndex]?.questions?.length + 1;

let questionArray: any[] = [];
for (let i = 1; i < totalNumberOfQuestions; i++) {
  questionArray.push(i);
}
```

2. **Mapping Questions:**
   Each question is passed to the **`Questions`** component along with essential props (e.g., `push`, `remove`, `setFieldValue`, and `values`).

```jsx
{
  sections[sectionIndex]?.questions?.map((multiQuestion: any, index: any) => (
    <Questions
      sectionIndex={sectionIndex}
      index={index}
      push={push}
      remove={remove}
      values={values}
      questionArray={questionArray}
      setFieldValue={setFieldValue}
      sections={sections}
    />
  ));
}
```

3. **Error Message Handling:**
   If any errors occur with the `questions` field, they are displayed via Formik’s `ErrorMessage` component.

```jsx
<div className="text-danger mt-5 bg-danger">
  <ErrorMessage name="questions" />
</div>
```

---

### **Component Hierarchy**

1. **MultiQuestion**
   - Renders a list of questions for the given section.
   - Contains **FieldArray** to manage the question list.
2. **Questions (Child Component)**
   - Manages individual question details and interactions.

---

### **Code Example**

```jsx
const MultiQuestion = ({ sectionIndex }: any) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => setEditMode(!editMode);

  return (
    <div className="fv-row col-lg-12">
      <FieldArray name={`sections[${sectionIndex}].questions`}>
        {(QuestionProps) => {
          const { push, remove, form } = QuestionProps;
          const { values, setFieldValue } = form;
          const { sections } = values;

          const totalNumberOfQuestions =
            sections[sectionIndex]?.questions?.length + 1;
          let questionArray: any[] = [];
          for (let i = 1; i < totalNumberOfQuestions; i++) {
            questionArray.push(i);
          }

          return (
            <div className="d-flex flex-column">
              {sections[sectionIndex]?.questions?.map(
                (multiQuestion: any, index: any) => (
                  <Questions
                    sectionIndex={sectionIndex}
                    index={index}
                    push={push}
                    remove={remove}
                    values={values}
                    questionArray={questionArray}
                    setFieldValue={setFieldValue}
                    sections={sections}
                  />
                )
              )}
            </div>
          );
        }}
      </FieldArray>
      <div className="text-danger mt-5 bg-danger">
        <ErrorMessage name="questions" />
      </div>
    </div>
  );
};

export default MultiQuestion;
```

---

### **Conclusion**

The **`MultiQuestion`** component is an essential part of managing dynamic forms. It allows for flexible question handling with the help of **Formik’s `FieldArray`** and ensures that users can seamlessly interact with multiple questions within a section. This component offers a solid foundation for building dynamic, interactive forms that require complex nested inputs.
