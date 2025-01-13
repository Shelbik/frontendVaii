export const categorizedIngredients = (ingredients) => {
  // Если ингредиенты отсутствуют или не являются массивом, возвращаем пустой объект
  if (!Array.isArray(ingredients)) {
    return {};
  }

  return ingredients.reduce((acc, ingredient) => {
    // Проверяем, существует ли категория у ингредиента
    const { category } = ingredient || {};

    // Если категория не существует, пропускаем этот ингредиент
    if (!category || !category.name) {
      return acc;
    }

    // Если категория ещё не добавлена в аккумулятор, добавляем её
    if (!acc[category.name]) {
      acc[category.name] = [];
    }

    // Добавляем ингредиент в соответствующую категорию
    acc[category.name].push(ingredient);
    return acc;
  }, {});
};
