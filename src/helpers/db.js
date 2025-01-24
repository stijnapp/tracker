import { getCurrentDateTime } from "./dateTime"

// TODO: dont get next id from length, get it from the highest id + 1
export const db = {
    // ! General
    getAllData() {
        return JSON.parse(localStorage.getItem("db")) ?? { workouts: [], activeWorkoutId: null, exercises: [], tags: [] }
    },
    setAllData(data) {
        localStorage.setItem("db", JSON.stringify(data))
    },
    // TODO: Remove this function once the app is finished
    setTestData() {
        localStorage.setItem("db", JSON.stringify(testData))
    },
    deleteAllData() {
        localStorage.removeItem("db")
    },

    // ! Workouts
    getAllWorkouts() {
        return JSON.parse(localStorage.getItem("db"))?.workouts ?? []
    },
    getWorkoutById(id) {
        return this.getAllWorkouts().find(workout => workout.id === id) ?? null
    },
    addWorkout() {
        const allData = this.getAllData()
        const newWorkout = {
            id: allData.workouts.length + 1,
            date: getCurrentDateTime(),
            exercises: [],
        }
        allData.workouts.push(newWorkout)
        allData.activeWorkoutId = newWorkout.id
        this.setAllData(allData)
        return newWorkout
    },
    updateWorkout(id, updatedWorkout) {
        const allData = this.getAllData()
        const index = allData.workouts.findIndex(workout => workout.id === id)
        if (index === -1) return false
        updatedWorkout.id = id
        allData.workouts[index] = updatedWorkout
        this.setAllData(allData)
        return true
    },
    deleteWorkout(id) {
        const allData = this.getAllData()
        if (!allData.workouts.some(workout => workout.id === id)) return false
        if (allData.activeWorkoutId === id) {
            allData.activeWorkoutId = null
        }
        allData.workouts = allData.workouts.filter(workout => workout.id !== id)
        this.setAllData(allData)
        return true
    },

    // ! Exercises within workout
    getWorkoutExerciseById(workoutId, exerciseId) {
        const workout = this.getWorkoutById(workoutId)
        return workout?.exercises.find(exercise => exercise.id === exerciseId) ?? null
    },
    addWorkoutExercise(workoutId, exerciseReferenceId) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return null
        const newExercise = {
            id: workout.exercises.length + 1,
            exerciseId: exerciseReferenceId,
            order: workout.exercises.reduce((highestOrder, exercise) => Math.max(highestOrder, exercise.order), 0) + 1,
            sets: [
                { id: 1, weight: null, reps: null },
                { id: 2, weight: null, reps: null },
                { id: 3, weight: null, reps: null },
            ],
        }
        workout.exercises.push(newExercise)
        this.updateWorkout(workoutId, workout)
        return newExercise
    },
    updateWorkoutExercise(workoutId, exerciseId, updatedExercise) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return false
        const index = workout.exercises.findIndex(exercise => exercise.id === exerciseId)
        if (index === -1) return false
        updatedExercise.id = exerciseId
        workout.exercises[index] = updatedExercise
        this.updateWorkout(workoutId, workout)
        return true
    },
    deleteWorkoutExercise(workoutId, exerciseId) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return false
        if (!workout.exercises.some(exercise => exercise.id === exerciseId)) return false
        workout.exercises = workout.exercises.filter(exercise => exercise.id !== exerciseId)
        this.updateWorkout(workoutId, workout)
        return true
    },
    // TODO: change order of exercise within workout (id, newOrder), then update all affected exercises with new order


    // TODO: add/update/delete set within exercise

    // ! Active workout
    getActiveWorkoutId() {
        return JSON.parse(localStorage.getItem("db"))?.activeWorkoutId ?? null
    },
    getActiveWorkout() {
        return this.getWorkoutById(this.getActiveWorkoutId())
    },
    setActiveWorkoutId(id) {
        const allData = this.getAllData()
        if (!allData.workouts.some(workout => workout.id === id)) return false
        allData.activeWorkoutId = id
        this.setAllData(allData)
        return true
    },

    // TODO: get data from *previous workout* to prefill new workout

    // ! Exercises
    getAllExercises() {
        return JSON.parse(localStorage.getItem("db"))?.exercises ?? []
    },
    getExerciseById(id) {
        return this.getAllExercises().find(exercise => exercise.id === id) ?? null
    },
    getExerciseByName(name) {
        return this.getAllExercises().find(exercise => exercise.name.trim().toLowerCase() === name.trim().toLowerCase()) ?? null
    },
    addExercise(newExerciseName) {
        const allData = this.getAllData()
        const newExercise = {
            id: allData.exercises.length + 1,
            name: newExerciseName,
            nickname: null,
            description: "",
            tagId: null,
        }
        allData.exercises.push(newExercise)
        this.setAllData(allData)
        return newExercise
    },
    updateExercise(id, updatedExercise) {
        const allData = this.getAllData()
        const index = allData.exercises.findIndex(exercise => exercise.id === id)
        if (index === -1) return false
        updatedExercise.id = id
        allData.exercises[index] = updatedExercise
        this.setAllData(allData)
        return true
    },
    deleteExercise(id) {
        const allData = this.getAllData()
        if (!allData.exercises.some(exercise => exercise.id === id)) return false
        allData.exercises = allData.exercises.filter(exercise => exercise.id !== id)
        this.setAllData(allData)
        return true
    },

    // ! Tags
    getAllTags() {
        return JSON.parse(localStorage.getItem("db"))?.tags ?? []
    },
    getTagById(id) {
        return this.getAllTags().find(tag => tag.id === id) ?? null
    },
    getTagByName(name) {
        return this.getAllTags().find(tag => tag.name.trim().toLowerCase() === name.trim().toLowerCase()) ?? null
    },
    addTag(newTagName) {
        const allData = this.getAllData()
        const newTag = {
            id: allData.tags.length + 1,
            name: newTagName,
        }
        allData.tags.push(newTag)
        this.setAllData(allData)
        return newTag
    },
    updateTag(id, updatedTag) {
        const allData = this.getAllData()
        const index = allData.tags.findIndex(tag => tag.id === id)
        if (index === -1) return false
        updatedTag.id = id
        allData.tags[index] = updatedTag
        this.setAllData(allData)
        return true
    },
    deleteTag(id) {
        const allData = this.getAllData()
        if (!allData.tags.some(tag => tag.id === id)) return false
        allData.tags = allData.tags.filter(tag => tag.id !== id)
        this.setAllData(allData)
        return true
    },
}

const testData = {
    workouts: [
        {
            id: 1,
            date: '2025-01-13T13:00',
            exercises: [
                {
                    id: 1,
                    exerciseId: 1,
                    order: 1,
                    sets: [
                        {
                            id: 1,
                            weight: 50,
                            reps: 12,
                        },
                        {
                            id: 2,
                            weight: 50,
                            reps: 12,
                        },
                    ]
                },
                {
                    id: 2,
                    exerciseId: 2,
                    order: 2,
                    sets: [
                        {
                            id: 1,
                            weight: 37.25,
                            reps: 13,
                        },
                    ]
                },
            ]
        },
    ],
    activeWorkoutId: 1,
    exercises: [
        {
            id: 1,
            name: 'Lat pulldown',
            nickname: null,
            description: 'description',
            tagId: 2
        },
        {
            id: 2,
            name: 'Chest press',
            nickname: null,
            description: 'description',
            tagId: 1
        },
    ],
    tags: [
        {
            id: 1,
            name: 'Chest'
        },
        {
            id: 2,
            name: 'Back'
        },
    ],
}
