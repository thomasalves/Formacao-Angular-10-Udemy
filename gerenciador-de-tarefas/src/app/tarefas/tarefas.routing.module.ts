import { Routes } from '@angular/router';

import { CadastrarTarefaComponent } from './cadastrar-tarefa';
import { ListarTarefaComponent } from './listar-tarefa';
import { EditarTarefaComponent } from "./editar-tarefa";

export const TarefaRoutes: Routes = [
    {
        path: 'tarefas',
        redirectTo: 'tarefas/listar'
    },
    {
        path: 'tarefas/listar',
        component: ListarTarefaComponent
    },
    {
        path: 'tarefas/cadastrar',
        component: CadastrarTarefaComponent
    },
    {
        path: 'tarefas/editar/:id',
        component: EditarTarefaComponent
    }
]