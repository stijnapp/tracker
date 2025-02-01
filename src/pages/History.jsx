import { useState } from "react";
import { Link } from "react-router-dom";
import AnimateInOut from "../components/AnimateInOut";
import Card from "../components/Card";
import Page from "../components/Page";
import { dateTimeToText } from "../helpers/dateTime";
import { db } from "../helpers/db";

export default function History() {
    const [workoutIds] = useState(db.getAllWorkoutIdsExcludingActive())
    console.log(db.getAllWorkoutIdsExcludingActive())

    return (
        <Page title="History">
            <AnimateInOut className="w-full flex flex-col gap-4 px-2 py-2">
                {workoutIds.length <= 0 && (
                    <Card className="flex flex-col gap-3">
                        <h1 className="text-center font-medium text-lg">Welcome to the Workout Tracker!</h1>
                        <p className="text-center">It looks like you haven&apos;t finished any workouts yet. Head over to the <Link to="/workout" className="font-medium underline text-primary">workout page</Link> to start your first workout.</p>
                    </Card>
                )}
            </AnimateInOut>

            <AnimateInOut className="w-full flex flex-col gap-4 px-2 py-2">
                {workoutIds.map((workoutId) => {
                    const workout = db.getWorkoutById(workoutId)

                    return (
                        <Card key={workoutId} title={dateTimeToText(workout.date)} className="flex flex-col gap-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{workout.exercises.length} exercises</p>
                        </Card>
                    )
                })}
            </AnimateInOut>
        </Page>
    )
}