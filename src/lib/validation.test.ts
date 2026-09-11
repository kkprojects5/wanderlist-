import {
  isValid,
  NAME_MAX_LENGTH,
  NOTES_MAX_LENGTH,
  validatePlaceForm,
} from "./validation";

// one good draft, and each test changes exactly one field of it. A test that
// rebuilds the whole form every time hides which field it is actually about.
const goodDraft = { name: "Lisbon", notes: "Go in spring.", category: "city" };

describe("validatePlaceForm", () => {
  it("accepts a filled-in form", () => {
    expect(validatePlaceForm(goodDraft)).toEqual({});
  });

  it("rejects an empty name", () => {
    const errors = validatePlaceForm({ ...goodDraft, name: "" });
    expect(errors.name).toBe("Name is required.");
  });

  it("rejects a name that is only spaces", () => {
    const errors = validatePlaceForm({ ...goodDraft, name: "   " });
    expect(errors.name).toBe("Name is required.");
  });

  it("rejects a name that is only digits", () => {
    const errors = validatePlaceForm({ ...goodDraft, name: "12345" });
    expect(errors.name).toBe("Name cannot be only digits.");
  });

  it("rejects a name one character over the limit", () => {
    const name = "a".repeat(NAME_MAX_LENGTH + 1);
    const errors = validatePlaceForm({ ...goodDraft, name });
    expect(errors.name).toBe(`Name must be ${NAME_MAX_LENGTH} characters or fewer.`);
  });

  it("rejects notes over the limit", () => {
    const notes = "a".repeat(NOTES_MAX_LENGTH + 1);
    const errors = validatePlaceForm({ ...goodDraft, notes });
    expect(errors.notes).toBe(`Notes must be ${NOTES_MAX_LENGTH} characters or fewer.`);
  });

  it("rejects a category that is not on the list", () => {
    const errors = validatePlaceForm({ ...goodDraft, category: "invalid" });
    expect(errors.category).toBeDefined();
  });
});

describe("isValid", () => {
  it("is false when any field has an error", () => {
    expect(isValid({ name: "Required" })).toBe(false);
  });
});