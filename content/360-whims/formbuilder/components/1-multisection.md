---
title: "MultiSection"
description: "An overview of MultiSection Component"
---

### **Code Documentation: MultiSection Component**

The `MultiSection` component is a React functional component that leverages `formik`'s `FieldArray` to dynamically render multiple sections and manage form fields. The component supports adding and removing sections with custom logic for each section. It also features a modal toggle mechanism using the React `useState` hook.

#### **Dependencies**

- **formik**: Provides `FieldArray` for managing dynamic form fields.
- **react**: Hooks used: `useState`, `useEffect`, `useRef`.
- **Sections**: A child component responsible for rendering individual section details.

---

### **Code Breakdown**

#### 1. **Component Definition**

```ts
const MultiSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
```

- **`isModalOpen`**: A state variable to manage the visibility of a modal.
- **`setIsModalOpen`**: Updates the modal state to open/close.

#### 2. **`handleModal` Function**

```ts
const handleModal = () => {
  setIsModalOpen(!isModalOpen);
};
```

- **`handleModal`**: Toggles the `isModalOpen` state, switching the modal's visibility.

---

### **Rendering the UI**

#### 3. **Top-level Container**

```ts
<div className="d-flex flex-column">
```

- Renders a flex container for vertical alignment.

---

### **FieldArray Usage**

#### 4. **FieldArray Implementation**

```ts
<FieldArray name="sections">
  {(fieldArrayProps) => {
    const { push, remove, form } = fieldArrayProps;
    const { values, setFieldValue } = form;
    const { sections } = values;
```

- **FieldArray**: Manages an array of sections.
  - **`push`**: Adds a new section to the array.
  - **`remove`**: Removes a section at the specified index.
  - **`form`**: Provides access to the form's values and methods, such as `setFieldValue`.

#### 5. **Mapping Through Sections**

```ts
{sections?.map((section: any, index: any) => {
```

- Iterates over the `sections` array to render each section using the `Sections` component.

---

### **Rendering Individual Sections**

#### 6. **Sections Component**

```ts
<Sections
  remove={remove}
  values={values}
  index={index}
  setFieldValue={setFieldValue}
/>
```

- **`Sections` Component**: Renders each section and provides functions for removing and updating section data.

---

### **Add Section Button**

#### 7. **Conditional Rendering of Add Button**

```ts
{values?.sections.length - 1 === index && (
  <div
    style={{ border: "1.5px solid black", borderStyle: "dashed" }}
    className="h-200px mt-15 d-flex align-items-center justify-content-center"
  >
    <i
      title="Add new section"
      className="fs-5x fas fa-plus-circle text-hover-primary cursor-pointer"
      onClick={() => push({...})}
    ></i>
  </div>
)}
```

- **Add Button Logic**:
  - Displays the **Add New Section** button only for the last section to avoid duplicate buttons.
  - **Button Action**: When clicked, it triggers the `push` function to add a new section with default values.

#### 8. **Default Section Structure**

```ts
push({
  secId: index + 1,
  sectionName: "",
  nextPage: true,
  questions: [
    {
      questionName: "",
      questionType: "TextField",
      validations: {
        dataType: "Text",
        minValue: "",
        maxValue: "",
        minLength: "",
        maxLength: ""
      },
      description: "",
      options: [{ option: "" }],
      questionRequired: false,
      descriptionRequired: false,
      validateTextField: false,
      isConditionalQuestion: false,
      conditions: [
        {
          textCondition: "",
          numberCondition: "",
          conditionValue: "",
          questionNumber: ""
        }
      ]
    }
  ],
  isDraft: true
});
```

- **Section Data Structure**:
  - **secId**: Unique identifier for each section.
  - **sectionName**: Name of the section.
  - **questions**: An array of question objects.
    - **validations**: Defines validation rules for each question.
    - **conditions**: Conditional logic for displaying questions.

---

### **Component Export**

```ts
export default MultiSection;
```

- Exports the `MultiSection` component for use in other parts of the application.

---

### **Summary**

The `MultiSection` component offers a dynamic, user-friendly way to manage form sections using `formik`'s `FieldArray`. It provides flexibility by allowing users to add and remove sections, each with a predefined data structure. The modular use of the `Sections` component ensures clean code and separation of concerns.
