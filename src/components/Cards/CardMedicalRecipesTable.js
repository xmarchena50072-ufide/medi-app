import React, { useState, useEffect } from "react";
import { getMedicalRecipes, deleteMedicalRecipe } from "../../api/recipes";

export default function CardMedicalRecipesTable() {
  const [recipes, setRecipes] = useState([]);

  // Función para obtener recetas desde la API
  const fetchRecipes = async () => {
    try {
      const data = await getMedicalRecipes();
      setRecipes(data);
    } catch (error) {
      alert("Error al obtener recetas médicas");
    }
  };

  // Función para eliminar una receta
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
      try {
        await deleteMedicalRecipe(id);
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        alert("Receta eliminada exitosamente");
      } catch (error) {
        alert("Error al eliminar la receta");
      }
    }
  };

  // Obtener recetas al montar el componente
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Encabezado */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Recetas Médicas</h6>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Medicamentos
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id} className="hover:bg-blueGray-100">
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {recipe.paciente}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {new Date(recipe.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  {recipe.medicamentos}
                </td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm text-right">
                  <button
                    className="bg-red-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
