pipeline {
    agent any

    options {
        ansiColor('xterm')
        }

    stages{
        stage('Open'){
            steps{
                nodejs('node-14.18.2'){
                    sh 'yarn install'
                    sh 'yarn cy:ci || true'
                }

            }
            post{
                always{
                    junit 'results/*.xml'
                }
            }
        }
      


    }

}
