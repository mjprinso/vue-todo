<template>
  <div class="row">
    <center>
      <img src="../assets/logo.png">
      <img src="../assets/to-do.jpg">
      <h3>A simple vue.js todo web app</h3>
    </center>
    <!-- <br> -->

    <el-dialog :visible.sync="dialogVisible" size="tiny" :close-on-press-escape="false" :show-close="false" :close-on-click-modal="false">
      <span slot="title">
        <center>
          <h4>Add New Task</h4>
        </center>
      </span>
      <span>
        <el-form :model="aTask" label-position="top" label-width="100px" :rules="rules" ref="taskForm">
          <el-form-item label="Task" prop="desc" required>
            <el-input type="textarea" v-model="aTask.desc" placeholder="Type task here"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="14" :offset="5">
                <el-form-item prop="due" label="Due date" required>
                  <span class="error" v-show="check">Due date is passed</span>
                  <el-date-picker type="date" placeholder="Pick a date" v-model="aTask.due" style="width: 100%;" @change="checkDue"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <center>
          <el-button type="primary" :loading="procAdd" v-if="procAdd">Adding</el-button>
          <div v-else>
            <el-button @click="dialogVisible = false" type="danger" :plain="true">Close</el-button>
            <el-button type="primary" @click="addTask(aTask)" :disabled="check">Add Task</el-button>
          </div>
        </center>
      </span>
    </el-dialog>

    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="12" :md="7" :lg="7">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Uncompleted Tasks" name="first">
            <center class="space">
              <h5 class="title" v-if="totalPending">Pending Tasks ( <small>{{ totalPending }}</small> )</h5>
              <h5 class="title" v-else>No pending tasks</h5>
            </center>
            <ul  class="task-list scroll">
              <li class="task" v-for="(tsk, index) in getPendingTasks" :key="tsk.desc">
                <p>
                  {{ tsk.desc }}, <small><i>{{ dateCreated(tsk.created) }}</i></small>
                  <br> 
                  <div> 
                    <i class="el-icon-date"></i> <small>{{ dateDue(tsk.due) }}</small>                                
                    <span class="right">
                      <el-tooltip content="Click to complete Task" placement="top">
                        <el-button type="success" size="mini" icon="check" @click="compTask(tsk)"></el-button>
                      </el-tooltip>
                      <el-tooltip content="Click to Delete Task" placement="top"> 
                         <el-button type="danger" size="mini" icon="delete" @click="delTaskP(tsk)"></el-button> 
                      </el-tooltip>
                    </span>
                  </div> 
                </p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="Completed Tasks" name="second">
            <center class="space">
              <h5 class="title" v-if="totalDone">Tasks Completed ( <small>{{ totalDone }}</small> )</h5>
              <h5 class="title" v-else>No Tasks Completed</h5>
            </center>
            <ul  class="task-list scroll">
               <li class="task" v-for="tsk in getCompletedTasks" :key="tsk.desc">
                <p>
                  {{ tsk.desc }}, <small><i>{{ dateCreated(tsk.created) }}</i></small>
                  <br> 
                  <div> 
                    <i class="el-icon-date"></i> <small>{{ dateDue(tsk.due) }}</small>                   
                    <span class="right">
                      <el-tooltip content="Click to complete Task" placement="top">
                        <el-button type="success" size="mini" icon="plus" @click="reAddTask(tsk)"></el-button>
                      </el-tooltip>
                      <el-tooltip content="Click to Delete Task" placement="top"> 
                        <el-button type="danger" size="mini" icon="delete" @click="delTaskP(tsk)"></el-button>
                      </el-tooltip>
                    </span>
                  </div> 
                </p>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-tooltip content="Click to Add Task" placement="top">
      <el-button type="success" icon="plus" class="fab" @click="dialogVisible = true" native-type="button"></el-button>  
    </el-tooltip>
  </div>
</template>

<script src="./controller.js"></script>

<style scoped>
    .ticon{
      margin-right: 10px;
    }
    .task-list{
      list-style: none;
      margin-left: 2px;
      margin-right: 10px;
    }
    .task{
       position: relative;
       display: block;
       padding: 0px 10px 5px 10px; 
       margin-bottom: 5px; 
       border: 1px solid #ddd;
       text-align: justify;
    }
    .right{
       float: right;
    } 
    .fab{
      display:block;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      position: fixed;
      bottom: 100px;
      right: 100px;
    }
    .error{
      text-align: justify;
      color: red;
    }
    .scroll{
      height: 400px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .space{
      margin: -10px 0px 5px 0px;
    }
</style>
