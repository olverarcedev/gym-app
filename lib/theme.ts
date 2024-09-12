import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";

export const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#1976d2',
            },
        },
    },
    esES
);
export const textDataGrid = {
    columnMenuSortAsc: 'Ordenar ascendente',
    columnMenuSortDesc: 'Ordenar descendente',
    columnMenuFilter: 'Filtrar',
    columnMenuHideColumn: 'Ocultar columna',
    columnMenuShowColumns: 'Mostrar columnas',
    filterPanelInputLabel: 'Valor',
    filterPanelInputPlaceholder: 'Filtrar valor',
    toolbarDensity: 'Densidad',
    toolbarDensityLabel: 'Densidad',
    toolbarDensityCompact: 'Compacta',
    toolbarDensityStandard: 'Estándar',
    columnMenuManageColumns: 'Gestionar columnas',
    columnsManagementShowHideAllText: 'Mostrar/Ocultar todo',
    toolbarDensityComfortable: 'Cómoda',
    noRowsLabel: 'Sin filas',
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} filas seleccionadas`
            : `${count} fila seleccionada`,
};