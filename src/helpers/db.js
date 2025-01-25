import { getCurrentDateTime } from "./dateTime"

/**
 * @typedef {Object} DB
 * @property {Array<Workout>} workouts
 * @property {number|null} activeWorkoutId
 * @property {Array<Exercise>} exercises
 * @property {Array<Tag>} tags
 */

/**
 * @typedef {Object} Workout
 * @property {number} id
 * @property {string} date
 * @property {Array<WorkoutExercise>} exercises
 */

/**
 * @typedef {Object} WorkoutExercise
 * @property {number} id
 * @property {number} exerciseId
 * @property {number} order
 * @property {Array<Set>} sets
 */

/**
 * @typedef {Object} Set
 * @property {number} id
 * @property {number|null} weight
 * @property {number|null} reps
 */

/**
 * @typedef {Object} Exercise
 * @property {number} id
 * @property {string} name
 * @property {string|null} nickname
 * @property {string} description
 * @property {number|null} tagId
 */

/**
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} name
 */

export const db = {
    // ! General
    /**
     * @returns {DB}
     */
    getAllData() {
        return JSON.parse(localStorage.getItem("db")) ?? { workouts: [], activeWorkoutId: null, exercises: [], tags: [] }
    },
    /**
     * @param {DB} data
     * @returns {void}
     */
    setAllData(data) {
        localStorage.setItem("db", JSON.stringify(data))
    },
    // TODO: Remove this function once the app is finished
    /**
     * @returns {void}
     */
    setTestData() {
        localStorage.setItem("db", JSON.stringify(testData))
    },
    /**
     * @returns {void}
     */
    deleteAllData() {
        localStorage.removeItem("db")
    },
    /**
     * @returns {boolean}
     */
    hasData() {
        return localStorage.getItem("db") !== null
    },

    // ! Workouts
    /**
     * @returns {Array<Workout>}
     */
    getAllWorkouts() {
        return JSON.parse(localStorage.getItem("db"))?.workouts ?? []
    },
    /**
     * @param {number} id
     * @returns {Workout|null}
     */
    getWorkoutById(id) {
        return this.getAllWorkouts().find(workout => workout.id === id) ?? null
    },
    /**
     * @returns {Workout}
     */
    addWorkout() {
        const allData = this.getAllData()
        const newWorkout = {
            id: allData.workouts.reduce((highestId, workout) => Math.max(highestId, workout.id), 0) + 1,
            date: getCurrentDateTime(),
            exercises: [],
        }
        allData.workouts.push(newWorkout)
        allData.activeWorkoutId = newWorkout.id
        this.setAllData(allData)
        return newWorkout
    },
    /**
     * 
     * @param {number} id
     * @param {Workout} updatedWorkout
     * @returns {boolean}
     */
    updateWorkout(id, updatedWorkout) {
        const allData = this.getAllData()
        const index = allData.workouts.findIndex(workout => workout.id === id)
        if (index === -1) return false
        updatedWorkout.id = id
        allData.workouts[index] = updatedWorkout
        this.setAllData(allData)
        return true
    },
    /**
     * @param {number} id
     * @returns {boolean}
     */
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
    /**
     * @param {number} workoutId
     * @param {number} exerciseId
     * @returns {WorkoutExercise|null}
     */
    getWorkoutExerciseById(workoutId, exerciseId) {
        const workout = this.getWorkoutById(workoutId)
        return workout?.exercises.find(exercise => exercise.id === exerciseId) ?? null
    },
    /**
     * @param {number} workoutId
     * @param {number} exerciseReferenceId
     * @returns {WorkoutExercise|null}
     */
    addWorkoutExercise(workoutId, exerciseReferenceId) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return null
        const newExercise = {
            id: workout.exercises.reduce((highestId, exercise) => Math.max(highestId, exercise.id), 0) + 1,
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
    /**
     * @param {number} workoutId
     * @param {number} exerciseId
     * @param {WorkoutExercise} updatedExercise
     * @returns {boolean}
     */
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
    /**
     * @param {number} workoutId
     * @param {number} exerciseId
     * @returns {boolean}
     */
    deleteWorkoutExercise(workoutId, exerciseId) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return false
        if (!workout.exercises.some(exercise => exercise.id === exerciseId)) return false
        workout.exercises = workout.exercises.filter(exercise => exercise.id !== exerciseId)
        this.updateWorkout(workoutId, workout)
        return true
    },
    /**
     * @param {number} workoutId
     * @param {number} exerciseId
     * @param {number} newOrder
     * @returns {boolean}
     */
    updateWorkoutExerciseOrder(workoutId, exerciseId, newOrder) {
        const workout = this.getWorkoutById(workoutId)
        if (!workout) return false

        if (newOrder < 1 || newOrder > workout.exercises.length) return false

        const exercise = workout.exercises.find(exercise => exercise.id === exerciseId)
        if (!exercise) return false

        const oldOrder = exercise.order
        if (oldOrder === newOrder) return false

        if (oldOrder < newOrder) {
            workout.exercises
                .filter(exercise => exercise.order > oldOrder && exercise.order <= newOrder)
                .forEach(exercise => exercise.order--)
        } else {
            workout.exercises
                .filter(exercise => exercise.order < oldOrder && exercise.order >= newOrder)
                .forEach(exercise => exercise.order++)
        }
        exercise.order = newOrder

        workout.exercises.sort((a, b) => a.order - b.order)

        // loop through exercises and check if order is the same as index + 1
        workout.exercises.forEach((exercise, index) => {
            if (exercise.order !== index + 1) {
                console.error('Invalid order:', exercise.order, index + 1)
                exercise.order = index + 1
            }
        })

        this.updateWorkout(workoutId, workout)
        return true
    },

    // TODO: add/update/delete set within exercise

    // ! Active workout
    /**
     * @returns {number|null}
     */
    getActiveWorkoutId() {
        return JSON.parse(localStorage.getItem("db"))?.activeWorkoutId ?? null
    },
    /**
     * @returns {Workout|null}
     */
    getActiveWorkout() {
        return this.getWorkoutById(this.getActiveWorkoutId())
    },
    /**
     * @param {number} id
     * @returns {boolean}
     */
    setActiveWorkoutId(id) {
        const allData = this.getAllData()
        if (!allData.workouts.some(workout => workout.id === id)) return false
        allData.activeWorkoutId = id
        this.setAllData(allData)
        return true
    },

    /**
     * @returns {number|null}
     */
    getPreviousWorkoutId() {
        // find the workout with the highest id that is not the active workout
        const allData = this.getAllData()
        const activeWorkoutId = this.getActiveWorkoutId()
        const previousWorkoutId = allData.workouts
            .filter(workout => workout.id !== activeWorkoutId)
            .reduce((highestId, workout) => Math.max(highestId, workout.id), 0)
        return previousWorkoutId === 0 ? null : previousWorkoutId
    },
    /**
     * @returns {Workout|null}
     */
    getPreviousWorkout() {
        return this.getWorkoutById(this.getPreviousWorkoutId())
    },
    /**
     * @param {number} exerciseId
     * @returns {WorkoutExercise|null}
     */
    getPreviousWorkoutExerciseById(exerciseId) {
        const allData = this.getAllData()
        const activeWorkoutId = this.getActiveWorkoutId()
        const workoutWithPreviousExercise = allData.workouts
            .filter(workout => workout.id !== activeWorkoutId)
            .find(workout => workout.exercises.some(exercise => exercise.exerciseId === exerciseId))
        if (!workoutWithPreviousExercise) return null
        return workoutWithPreviousExercise.exercises.find(exercise => exercise.exerciseId === exerciseId) ?? null
    },

    // ! Exercises
    /**
     * @returns {Array<Exercise>}
     */
    getAllExercises() {
        return JSON.parse(localStorage.getItem("db"))?.exercises ?? []
    },
    /**
     * @param {number} id
     * @returns {Exercise|null}
     */
    getExerciseById(id) {
        return this.getAllExercises().find(exercise => exercise.id === id) ?? null
    },
    /**
     * @param {string} name
     * @returns {Exercise|null}
     */
    getExerciseByName(name) {
        return this.getAllExercises().find(exercise => exercise.name.trim().toLowerCase() === name.trim().toLowerCase()) ?? null
    },
    /**
     * @param {string} newExerciseName
     * @returns {Exercise}
     */
    addExercise(newExerciseName) {
        const allData = this.getAllData()
        const newExercise = {
            id: allData.exercises.reduce((highestId, exercise) => Math.max(highestId, exercise.id), 0) + 1,
            name: newExerciseName,
            nickname: null,
            description: "",
            tagId: null,
        }
        allData.exercises.push(newExercise)
        this.setAllData(allData)
        return newExercise
    },
    /**
     * @param {Array<Exercise>} exercises
     * @returns {void}
     */
    updateAllExercises(exercises) {
        const allData = this.getAllData()
        allData.exercises = exercises
        this.setAllData(allData)
    },
    /**
     * @param {number} id
     * @param {Exercise} updatedExercise
     * @returns {boolean}
     */
    updateExercise(id, updatedExercise) {
        const allData = this.getAllData()
        const index = allData.exercises.findIndex(exercise => exercise.id === id)
        if (index === -1) return false
        updatedExercise.id = id
        allData.exercises[index] = updatedExercise
        this.setAllData(allData)
        return true
    },
    /**
     * @param {number} id
     * @returns {boolean}
     */
    deleteExercise(id) {
        const allData = this.getAllData()
        if (!allData.exercises.some(exercise => exercise.id === id)) return false
        allData.exercises = allData.exercises.filter(exercise => exercise.id !== id)
        this.setAllData(allData)
        return true
    },

    // ! Tags
    /**
     * @returns {Array<Tag>}
     */
    getAllTags() {
        return JSON.parse(localStorage.getItem("db"))?.tags ?? []
    },
    /**
     * @param {number} id
     * @returns {Tag|null}
     */
    getTagById(id) {
        return this.getAllTags().find(tag => tag.id === id) ?? null
    },
    /**
     * @param {string} name
     * @returns {Tag|null}
     */
    getTagByName(name) {
        return this.getAllTags().find(tag => tag.name.trim().toLowerCase() === name.trim().toLowerCase()) ?? null
    },
    /**
     * @param {string} newTagName
     * @returns {Tag}
     */
    addTag(newTagName) {
        const allData = this.getAllData()
        const newTag = {
            id: allData.tags.reduce((highestId, tag) => Math.max(highestId, tag.id), 0) + 1,
            name: newTagName,
        }
        allData.tags.push(newTag)
        this.setAllData(allData)
        return newTag
    },
    /**
     * @param {number} id
     * @param {Tag} updatedTag
     * @returns {boolean}
     */
    updateTag(id, updatedTag) {
        const allData = this.getAllData()
        const index = allData.tags.findIndex(tag => tag.id === id)
        if (index === -1) return false
        updatedTag.id = id
        allData.tags[index] = updatedTag
        this.setAllData(allData)
        return true
    },
    /**
     * @param {number} id
     * @returns {boolean}
     */
    deleteTag(id) {
        const allData = this.getAllData()
        if (!allData.tags.some(tag => tag.id === id)) return false
        allData.tags = allData.tags.filter(tag => tag.id !== id)
        this.setAllData(allData)
        return true
    },
}

/**
 * @type {DB}
 */
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
            description: 'Keep back straight',
            tagId: 2
        },
        {
            id: 2,
            name: 'Chest press',
            nickname: null,
            description: 'Just like bench press',
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
