const getTooltip = (tooltipCategories, option) =>
  tooltipCategories.map(tt => `${tt}: ${option[tt]}`).join(' ;');

const selectProps = {
  path: 'publication',
  labelName: 'title',
  categoryName: '_id',
  tooltipName: ['title', 'author', 'Language']
};

const formatReceptionValues = (id, publications) => {
  const details = publications[id] || { title: '...', author: '', Language: '' };
  return {
    label: details.title || '...',
    value: id,
    tooltip: getTooltip(selectProps.tooltipName, details)
  };
};

export { getTooltip, selectProps, formatReceptionValues };
