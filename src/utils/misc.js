const getTooltip = (tooltipCategories, option) =>
  tooltipCategories.map(tt => `${tt}: ${option[tt]}`).join(' ;');

export { getTooltip };
