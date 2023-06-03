'use strict'

// Llamado del modelo
const Task = use('App/Models/Task.js')

class TaskController {
    async index( {view} ) {
        // Llamado de toda la información desde el modelo (Task)
        const tasks = await Task.all()

        // Retorno de una vista
        return view.render(
            // Almacenada en la carpeta tasks el archivo index
            'tasks.index',
            {
                // Se envia la información listada como data a la vista
                tasks: tasks.toJSON() 
            }
        )
    }

    async store( {request, response} ) {
        const task = new Task()
        task.title = request.input('title')
        task.body = request.input('body')
        await task.save()

        return response.redirect('tasks')
    }

    async update( {params, request, response} ) {
        const id = params.id

        const task = await Task.find(id)
        task.title = request.input('title')
        task.body = request.input('body')
        await task.save()

        return response.redirect(`${id}`)
    }

    async details( {params, view} ) {
        const id = params.id

        const task = await Task.find(id)

        return view.render(
            'tasks.show', {
                task: task
            }
        )
    }

    async destroy( {params, response} ) {
        const id = params.id

        const task = await Task.find(id)
        await task.delete()

        return response.redirect('tasks')
    }

    async add( {view} ) {
        return view.render(
            'tasks.add'
        )
    }
    
    async edit( {params, view} ) {
        const id = params.id

        const task = await Task.find(id)

        return view.render(
            'tasks.edit',
            {
                task: task
            }
        )
    }
}

module.exports = TaskController
