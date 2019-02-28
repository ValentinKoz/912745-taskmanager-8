let getFilter = (caption, amount = 0, isChecked = false) => {
  const lowerCaption = caption.toLowerCase();
  return `
		<input
          type="radio"
          id="filter__${lowerCaption}"
          class="filter__input visually-hidden"
          name='filter'
          ${isChecked ? ` checked` : ``}
        />
		<label for="filter__${lowerCaption}" class="filter__label">${caption}
		<span class="filter__${lowerCaption}-count">${amount}</span></label>`;
};

export default getFilter;
