import firebase from "firebase/compat/app";
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { cycleDiagram } from '../../../app/components/cycle/cycle'
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, doc, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import TasksStat from './TasksStat';

/** @const {Object} - Fierbase service */
export const Fierbase = {

    /**
     * @function init
     *Initialize firebase App.
     */
    init() {
        if (!firebase?.apps.length) {
            firebase.initializeApp(
                {
                    apiKey: "AIzaSyD7zr-QTu6zjF-1C-rx5lKOwFTGOIf3waA",
                    authDomain: "fe-lab-starting-kit-2018-e7bf1.firebaseapp.com",
                    projectId: "fe-lab-starting-kit-2018-e7bf1",
                    storageBucket: "fe-lab-starting-kit-2018-e7bf1.appspot.com",
                    messagingSenderId: "303173294263",
                    appId: "1:303173294263:web:0aa4ad0f29c5457b431532"
                }
            );
        }
    },

    /**
     * @function getSettingsForTimer
     * Takes settings from firebase.
     * @returns {Object} - settings data. 
     */
    async getSettingsForTimer() {
        const db = getFirestore();
        let infoSet = collection(db, "settings");
        const queryToGetInfo = await getDocs(infoSet);
        let tokenShapshot = queryToGetInfo.docs;
        let object;
        const notificationPromises = tokenShapshot.map(data => {
            for (let i = 0; i < data.data().categories.length; i++) {
                object = {
                    work_time: data.data().categories[0],
                    rest_time: data.data().categories[1],
                    long_break: data.data().categories[3],
                    faze: data.data().categories[2]
                }
            }
        });
        return object;
    },

    /**
     * @function getSettings
     * Takes settings from Component Settings and sets them to firebase.
     */
    async getSettings() {
        const db = getFirestore();
        let infoSet = collection(db, "settings");
        const queryToGetInfo = await getDocs(infoSet);
        let tokenShapshot = queryToGetInfo.docs;
        const notificationPromises = tokenShapshot.map(data => {
            var timeNow = Date.now() - (Date.now() % 86400000);
            let dateInTable = data.data().estimationItemDuration - (data.data().estimationItemDuration % 86400000)
            if (dateInTable === timeNow) {
                for (let i = 0; i < data.data().categories.length; i++) {
                    cycleDiagram(data.data().categories[1], data.data().categories[0], data.data().categories[2], data.data().categories[3])
                    document.getElementById('vote1').innerHTML = data.data().categories[0];
                    document.getElementById('vote2').innerHTML = data.data().categories[1];
                    document.getElementById('vote3').innerHTML = data.data().categories[2];
                    document.getElementById('vote4').innerHTML = data.data().categories[3];
                }
            } else {
                const defaultUpdate = doc(db, "settings", data.id);
                updateDoc(defaultUpdate, {
                    estimationItemDuration: Date.now(),
                    maxEstimationValue: 10,
                    categories: [25, 4, 2, 30]
                });
                cycleDiagram(25, 4, 2, 30)
            }
        });
    },

    /**
     * @function updateSettings
     * Updates settings to firestore.
     * @param {Number} workTime - Duration of workTime.
     * @param {Number} workIteration - Duration of workIteration.
     * @param {Number} shortBreak - Duration of shortBreak.
     * @param {Number} longBreak - Duration of longBreak.
     * @returns {Boolean} - successful query or not
     */
    async updateSettings(workTime, workIteration, shortBreak, longBreak) {
        const db = getFirestore();
        let id = 0;
        try {
            let infoSet = collection(db, "settings");
            const queryToGetInfo = await getDocs(infoSet);
            queryToGetInfo.forEach((data) => {
                id = data.id;
            });
            const getDataById = doc(db, "settings", id);
            updateDoc(getDataById, {
                estimationItemDuration: Date.now(),
                maxEstimationValue: 167,
                categories: [workTime, workIteration, shortBreak, longBreak]
            });
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * @function addTask
     * Add task to firestore.
     * @param {Object} task - The components.
     * @returns {Boolean} - successful query or not
     */
    async addTask(task) {
        const db = getFirestore();
        try {
            const docRef = await addDoc(collection(db, "task"), {
                title: task.title,
                description: task.description,
                createdDate: task.createdDate,
                startDate: null,
                deadline: task.deadline,
                isActive: false,
                estimationTotal: task.estimationTotal,
                estimationUsed: 0,
                priority: task.priority,
                category: task.category,
                status: task.status,
                completedDate: task.completedDate
            });
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * @function checkTasks
     * Count amount of all tasks.
     * @returns {Number} - count of Tasks.
     */
    async checkTasks() {
        const db = getFirestore();
        const q = query(collection(db, "task"));

        const querySnapshot = await getDocs(q);
        let count = 0;
        querySnapshot.forEach((doc) => {
            count++;
            //console.log(doc.id, " => ", doc.data());
        });
        return count;
    },

    /**
     * @function checkTasksByCategory
     * Count tasks by category.
     * @param {string} categoryName - Category of Task.
     * @param {string} priority - Priority of Task.
     * @returns {Number} - Count of Tasks By Category.
     */
    async checkTasksByCategory(categoryName, priority) {
        const db = getFirestore();
        let count = 0;
        if (priority === "all") {
            const q = query(collection(db, "task"), where("category", "==", categoryName));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                count++;
            });
        } else {
            const q = query(collection(db, "task"), where("category", "==", categoryName), where("priority", "==", priority));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                count++;
            });
        }
        return count;
    },

    /**
     * @function getDailyTasks
     * Get array of daily tasks.
     * @returns {Object} - Array of Daily Tasks.
     */
    async getDailyTasks() {
        const db = getFirestore();
        let tokenShapshot;
        const q = query(collection(db, "task"), where("isActive", "==", true),orderBy("createdDate"));
        const querySnapshot = await getDocs(q);
        tokenShapshot = querySnapshot.docs;
        return tokenShapshot;
    },

    /**
     * @function checkDailyTasks
     * Check count of daily tasks.
     * @returns {Number} - Count of Daily Tasks.
     */
    async checkDailyTasks() {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("isActive", "==", true));

        const querySnapshot = await getDocs(q);
        let count = 0;
        querySnapshot.forEach((doc) => {
            let getDate = (Date.parse(doc.data().createdDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate) {
                count++;
            }
        });
        return count;
    },

    /**
     * @function checkCountTasks
     * Check count of all daily tasks by priority.
     * @param {string} level - Priority of task.
     * @returns {Number} - Count Tasks By Priority to DailyList.
     */
    async checkCountTasks(level) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("isActive", "==", true), where("priority", "==", level));

        const querySnapshot = await getDocs(q);
        let count = 0;
        querySnapshot.forEach((doc) => {
            let getDate = (Date.parse(doc.data().createdDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate) {
                count++;
            }
        });
        return count;
    },

    /**
     * @function getTasksByCategory
     * Get tasks by category.
     * @param {string} nameCategory - Category name.
     * @param {string} priority - Priority name.
     * @returns {Object} - Array of Tasks by Category.
     */
    async getTasksByCategory(nameCategory, priority) {
        const db = getFirestore();
        let tokenShapshot;
        if (priority === "all") {
            const q = query(collection(db, "task"), where("category", "==", nameCategory), orderBy("createdDate"));
            const querySnapshot = await getDocs(q);
            tokenShapshot = querySnapshot.docs;
        } else {
            const q = query(collection(db, "task"), where("category", "==", nameCategory), where("priority", "==", priority), orderBy("createdDate"));
            const querySnapshot = await getDocs(q);
            tokenShapshot = querySnapshot.docs;
        }
        return tokenShapshot;
    },

    /**
     * @function getTasksByPriority
     * Get tasks by prioriry.
     * @param {string} nameCategory - Category name.
     * @param {string} priority - Priority name.
     * @returns {Object} - Array of tasks by priority.
     */
    async getTasksByPriority(nameCategory, priority) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("category", "==", nameCategory), where("priority", "==", priority));
        const querySnapshot = await getDocs(q);
        let tokenShapshot = querySnapshot.docs;
        return tokenShapshot;
    },

    /**
     * @function deleteTask
     * Delete task by id.
     * @param {string} id - Id of the task.
     * @returns {Boolean} - successful query or not
     */
    async deleteTask(id) {
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, "task", id));
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * @function deleteListTasks
     * Delete array of checked tasks.
     * @param {Array} data - Array of tasks to delete.
     * @returns {Boolean} - successful query or not
     */
    async deleteListTasks(data) {
        let a = false;
        try {
            const db = getFirestore();
            for (let i = 0; i < data.length; i++) {
                await deleteDoc(doc(db, "task", data[i]));
                console.log("Task deleted with ID: ", data[i]);
            }
            a = true;
        } catch (e) {
            console.error("Error adding document: ", e);
            a = false;
        }
        return a;
    },

    /**
     * @function updateTasksToDaily
     * Update task to daily.
     * @param {Number} id - Id of task.
     * @returns {Boolean} - successful query or not
     */
    async updateTasksToDaily(id) {
        const db = getFirestore();
        try {
            const updateData = doc(db, "task", id);
            await updateDoc(updateData, {
                createdDate: new Date(Date.now()),
                isActive: true
            });
            return true;
        } catch (e) {
            console.error("Error updating document: ", e);
            return false;
        }
    },

    /**
     * @function updateTaskToCompleted
     * Update task to completed.
     * @param {Number} id - Id of the task.
     * @param {Number} estimation - Estimation completed of the task.
     * @param {Number} estimationTot - Estimation total of the task.
     * @returns {Boolean} - successful query or not
     */
    async updateTaskToCompleted(id, estimation, estimationTot) {
        const db = getFirestore();
        try {
            const updateData = doc(db, "task", id);
            await updateDoc(updateData, {
                completedDate: new Date(Date.now()),
                status: "COMPLETED",
                estimationUsed: estimation,
                estimationTotal: estimationTot
            });
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * @function updateTask
     * Update task data to firestore.
     * @param {Object} task - Object of the task.
     * @param {Number} id - Number of the task.
     * @returns {Boolean} - successful query or not
     */
    async updateTask(task, id) {
        const db = getFirestore();
        try {
            const updateData = doc(db, "task", id);
            await updateDoc(updateData, {
                title: task.title,
                description: task.description,
                deadline: new Date(task.deadline),
                estimationTotal: task.estimationTotal,
                priority: task.priority,
                category: task.category
            });
            return true;
        } catch (e) {
            console.error("Error updating document: ", e);
            return false;
        }
    },

    /**
     * @function getDataToEdit
     * Get data of task to edit.
     * @param {Number} id - Id of the task.
     * @returns {Object} - Task to update.
     */
    async getDataToEdit(id) {
        const db = getFirestore();
        const defaultUpdate = doc(db, "task", id);
        const docSnap = await getDoc(defaultUpdate);
        if (docSnap.exists()) {
            return docSnap;
        } else {
            console.log("No such document!");
        }
    },

    /**
     * @function countStatTasksByPriority
     * Start to init components with routes.
     * @returns {Object} -  Tasks statistic for day.
     */
    async countStatTasksByPriority() {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));

        const querySnapshot = await getDocs(q);
        let statTasks = new TasksStat(0, 0, 0, 0, 0);
        querySnapshot.forEach((doc) => {
            let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate) {
                if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                    if (doc.data().priority === "Urgent") {
                        statTasks.urgent++;
                    } else if (doc.data().priority === "High") {
                        statTasks.high++;
                    } else if (doc.data().priority === "Middle") {
                        statTasks.middle++;
                    } else {
                        statTasks.low++;
                    }
                } else {
                    statTasks.failed++;
                }
            }
        });
        return statTasks;
    },

    /**
     * @function countStatTasksDayByPriority
     * Returns tasks statistic for day.
     * @returns {Object} - Tasks statistic for day.
     */
    async countStatTasksDayByPriority() {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));

        const querySnapshot = await getDocs(q);
        let statTasks = new TasksStat(0, 0, 0, 0, 0);
        querySnapshot.forEach((doc) => {
            let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate) {
                if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                    if (doc.data().priority === "Urgent") {
                        statTasks.urgent++;
                    } else if (doc.data().priority === "High") {
                        statTasks.high++;
                    } else if (doc.data().priority === "Middle") {
                        statTasks.middle++;
                    } else {
                        statTasks.low++;
                    }
                } else {
                    statTasks.failed++;
                }
            }
        });
        return statTasks;
    },

    /**
     * @function countStatPomodorosDayByPriority
     * Returns pomodoros statistic for day.
     * @returns {Object} - Pomodoro statistic for day.
     */
    async countStatPomodorosDayByPriority() {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));

        const querySnapshot = await getDocs(q);
        let statTasks = new TasksStat(0, 0, 0, 0, 0);
        querySnapshot.forEach((doc) => {
            let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
            let nowDate = new Date(Date.now()).setHours(0, 0, 0, 0) / 1000;
            if (getDate === nowDate) {
                if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                    if (doc.data().priority === "Urgent") {
                        statTasks.urgent += doc.data().estimationUsed
                    } else if (doc.data().priority === "High") {
                        statTasks.high += doc.data().estimationUsed;
                    } else if (doc.data().priority === "Middle") {
                        statTasks.middle += doc.data().estimationUsed;
                    } else {
                        statTasks.low += doc.data().estimationUsed;
                    }
                } else {
                    statTasks.failed += doc.data().estimationUsed;
                }
            }
        });
        return statTasks;
    },

    /**
     * @function countStatTasksWeekByPriority
     * Returns tasks statistic for week.
     * @param {Array} weekDatas - Data's of current week.
     * @returns {Object} - Tasks statistic for week.
     */
    async countStatTasksWeekByPriority(weekDatas) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));
        const querySnapshot = await getDocs(q);
        let statTasks;
        let arr = [];
        for (let i = 0; i < weekDatas.length; i++) {
            statTasks = new TasksStat(0, 0, 0, 0, 0);
            querySnapshot.forEach((doc) => {
                let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
                let nowDate = new Date(weekDatas[i]).setHours(0, 0, 0, 0) / 1000;
                if (getDate === nowDate) {
                    if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                        if (doc.data().priority === "Urgent") {
                            statTasks.urgent++;
                        } else if (doc.data().priority === "High") {
                            statTasks.high++;
                        } else if (doc.data().priority === "Middle") {
                            statTasks.middle++;
                        } else {
                            statTasks.low++;
                        }
                    } else {
                        statTasks.failed++;
                    }
                }
            });
            arr.push(statTasks);
        }
        return arr;
    },

    /**
     * @function countStatPomodorosWeekByPriority
     * Return pomodoros statistic for week.
     * @param {Array} weekDatas - Data's of current week.
     * @returns {Object} - Pomodoros statistic for week.
     */
    async countStatPomodorosWeekByPriority(weekDatas) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));
        const querySnapshot = await getDocs(q);
        let statTasks;
        let arr = [];
        for (let i = 0; i < weekDatas.length; i++) {
            statTasks = new TasksStat(0, 0, 0, 0, 0);
            querySnapshot.forEach((doc) => {
                let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
                let nowDate = new Date(weekDatas[i]).setHours(0, 0, 0, 0) / 1000;
                if (getDate === nowDate) {
                    if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                        if (doc.data().priority === "Urgent") {
                            statTasks.urgent += doc.data().estimationUsed
                        } else if (doc.data().priority === "High") {
                            statTasks.high += doc.data().estimationUsed;
                        } else if (doc.data().priority === "Middle") {
                            statTasks.middle += doc.data().estimationUsed;
                        } else {
                            statTasks.low += doc.data().estimationUsed;
                        }
                    } else {
                        statTasks.failed += doc.data().estimationUsed;
                    }
                }
            });
            arr.push(statTasks);
        }
        return arr;
    },

    /**
     * @function countStatTasksMonthByPriority
     * Return tasks statistic for month.
     * @param {Array} weekDatas - Data's of current month.
     * @returns {Object} - Tasks statistic for month.
     */
    async countStatTasksMonthByPriority(weekDatas) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));
        const querySnapshot = await getDocs(q);
        let statTasks;
        let arr = [];
        for (let i = 0; i < weekDatas.length; i++) {
            statTasks = new TasksStat(0, 0, 0, 0, 0);
            querySnapshot.forEach((doc) => {
                let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
                let nowDate = new Date(weekDatas[i]).setHours(0, 0, 0, 0) / 1000;
                if (getDate === nowDate) {
                    if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                        if (doc.data().priority === "Urgent") {
                            statTasks.urgent++;
                        } else if (doc.data().priority === "High") {
                            statTasks.high++;
                        } else if (doc.data().priority === "Middle") {
                            statTasks.middle++;
                        } else {
                            statTasks.low++;
                        }
                    } else {
                        statTasks.failed++;
                    }
                }
            });
            arr.push(statTasks);
        }
        return arr;
    },


    /**
     * @function countStatPomodorosMonthByPriority
     * Return pomodoros statistic for month.
     * @param {Array} weekDatas - Data's of current month.
     * @returns {Object} - Pomodoros statistic for month.
     */
    async countStatPomodorosMonthByPriority(weekDatas) {
        const db = getFirestore();
        const q = query(collection(db, "task"), where("status", "==", "COMPLETED"));
        const querySnapshot = await getDocs(q);
        let statTasks;
        let arr = [];
        for (let i = 0; i < weekDatas.length; i++) {
            statTasks = new TasksStat(0, 0, 0, 0, 0);
            querySnapshot.forEach((doc) => {
                let getDate = (Date.parse(doc.data().completedDate.toDate().toDateString()) / 1000);
                let nowDate = new Date(weekDatas[i]).setHours(0, 0, 0, 0) / 1000;
                if (getDate === nowDate) {
                    if (doc.data().estimationTotal / 2 <= doc.data().estimationUsed) {
                        if (doc.data().priority === "Urgent") {
                            statTasks.urgent += doc.data().estimationUsed
                        } else if (doc.data().priority === "High") {
                            statTasks.high += doc.data().estimationUsed
                        } else if (doc.data().priority === "Middle") {
                            statTasks.middle += doc.data().estimationUsed
                        } else {
                            statTasks.low += doc.data().estimationUsed
                        }
                    } else {
                        statTasks.failed += doc.data().estimationUsed
                    }
                }
            });
            arr.push(statTasks);
        }
        return arr;
    },
}