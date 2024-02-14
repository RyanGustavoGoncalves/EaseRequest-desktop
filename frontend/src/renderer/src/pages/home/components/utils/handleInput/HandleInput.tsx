export const handleInputFocus = (labelId: string): void => {
    const label = document.getElementById(labelId);
    if (label) {
        label.classList.add('active');
    }
};

export const handleInputBlur = (labelId: string): void => {
    const label = document.getElementById(labelId);
    const inputId = labelId.replace('Label', '');
    const input = document.getElementById(inputId);

    if (input && input instanceof HTMLInputElement && input.value.trim() !== '') {
        if (label) {
            label.classList.add('active');
        }
        return;
    }

    if (label) {
        label.classList.remove('active');
    }
};
