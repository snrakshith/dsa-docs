---
title: "Sections"
description: "An overview of Sections Component"
---

## `Sections` Component Documentation

### **Description**

The `Sections` component renders a dynamic section within a form using `Formik` with drag-and-drop functionality. It allows users to create, edit, reorder, and remove sections, as well as toggle pagination options between sections.

It integrates:

- **Drag and Drop** (`react-beautiful-dnd`)
- **Formik's FieldArray** to manage multiple sections
- **MUI Collapse** for expandable sections
- A modal for confirming deletions

---

### **Props**

| Prop            | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| `values`        | `any`      | Contains the form values including section data.           |
| `index`         | `number`   | Index of the current section in the sections array.        |
| `setFieldValue` | `Function` | Formik's function to programmatically update field values. |
| `remove`        | `Function` | Function to remove a section from the array.               |

---

### **State Variables**

| State              | Type      | Description                                            |
| ------------------ | --------- | ------------------------------------------------------ |
| `open`             | `boolean` | Controls whether the section is collapsed or expanded. |
| `saveState`        | `boolean` | Tracks if the section name is saved.                   |
| `editSectionTitle` | `boolean` | Determines whether the section title is editable.      |
| `hoverEffect`      | `boolean` | Enables hover-based UI enhancements for icons.         |
| `isModalOpen`      | `boolean` | Toggles the modal for section deletion confirmation.   |
| `clickedIndex`     | `number`  | Stores the index of the section being interacted with. |

---

### **Functionality**

#### **`handleModal()`**

Toggles the modal's open state to confirm section deletion.

#### **`handleSectionTitle(index)`**

Enables title editing for the section corresponding to the provided index. If the clicked section matches the active one, it toggles edit mode.

#### **`handleSaveButton()`**

Saves the section title and exits edit mode if the clicked index matches the active section.

#### **`handleCancelButton(setFieldValue)`**

Cancels title editing and resets the section name to an empty string.

---

### **Drag-and-Drop Configuration**

- **`DragDropContext`**: Wraps the entire section to enable drag-and-drop.
- **`onDragEnd(params)`**: Handles the reordering of questions within a section. When a question is moved, the source and destination indices are swapped.

```js
[cloneArr[sourceIndex], cloneArr[destinationIndex]] = [cloneArr[destinationIndex], cloneArr[sourceIndex]];
```

---

### **Rendering Logic**

#### **Section Header**

- Displays section name with optional hover controls to edit or delete.
- Toggles pagination between "New Page" or "Previous Page" with a switch.

#### **Editing Section Title**

- Users can enter a section name when the edit mode is enabled.
- Contains **Save** and **Cancel** icons for managing title changes.

#### **Delete Button & Modal**

- A delete icon triggers the **Modal** to confirm section removal.
- **`DeleteDialog`** inside the modal provides further deletion logic.

#### **MUI Collapse Integration**

- Uses **Collapse** to hide or show section content.
- When the section is expanded, it renders a **MultiQuestion** component.

---

### **Code Snippet Example Usage**

```jsx
<DragDropContext
  onDragEnd={(params) => {
    const sourceIndex = params.source.index;
    const destinationIndex = params.destination?.index;
    const questions = values.sections[index].questions;

    if (destinationIndex !== undefined) {
      [questions[sourceIndex], questions[destinationIndex]] = [questions[destinationIndex], questions[sourceIndex]];
    }
  }}>
  <Droppable droppableId={`drop-${index}`}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Collapse in={open && clickedIndex === index}>
          <MultiQuestion sectionIndex={index} />
          {provided.placeholder}
        </Collapse>
      </div>
    )}
  </Droppable>
</DragDropContext>
```

---

### **Component Hierarchy**

1. **DragDropContext** → Wraps the section to enable drag-and-drop.
2. **Droppable** → Defines a droppable area for questions.
3. **Draggable** → Makes each question reorderable.
4. **Modal** → Confirms section deletion.

---

### **Dependencies**

- **Formik**: For form handling.
- **react-beautiful-dnd**: For drag-and-drop functionality.
- **MUI Collapse & Switch**: For UI elements.
- **DeleteDialog**: A custom modal for confirming section deletion.

---

### **Conclusion**

The `Sections` component offers a powerful and user-friendly interface for managing multiple sections within a form. It provides intuitive controls for reordering, editing, and deleting sections, while ensuring a seamless user experience with drag-and-drop and collapsible sections.
