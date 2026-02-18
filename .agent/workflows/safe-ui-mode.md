---
description: Enforcement of safety protocols for UI/UX changes to prevent code breakage
---
# 🔒 SAFE UI/UX MODE

This workflow is used to ensure that UI/UX changes are made safely, with proper planning and user approval, to avoid breaking existing functionality or accidental file overwrites.

## Mandatory Steps

1. **PLANNING ONLY FIRST**: 
   - Research the current implementation.
   - Create/Update `implementation_plan.md` in the current activity's brain directory.
   - Request explicit user approval via `notify_user` before making ANY code changes.

2. **NO FILE OVERWRITES**: 
   - Use targeted code edit tools (`replace_file_content` or `multi_replace_file_content`) only.
   - Never use `write_to_file` to overwrite existing configuration or logic files unless explicitly approved for a complete redesign.

3. **SHOW IMPACT ANALYSIS**: 
   - In your plan, list every file that will be modified.
   - Clearly explain the intended changes and why they are necessary.
   - Identify potential side effects on existing features.

4. **NO PARALLEL CHANGES**: 
   - Edit files one at a time or in small, logical groups.
   - Verify each change set before moving to the next.

5. **VERIFY DEPENDENCIES**: 
   - Before editing, search for all references to the code being changed.
   - Ensure that changing a style or component doesn't break other parts of the application.

6. **WALKTHROUGH & PROOF**:
   - Provide a `walkthrough.md` with screenshots or browser recordings demonstrating the changes.
   - Specifically call out how you verified that existing functionality remains intact.
