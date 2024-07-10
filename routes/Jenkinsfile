pipeline {
    agent any

    triggers {
        pollSCM('* * * * *') // This checks for changes every minute
        // Alternatively, you can use GitHub hook trigger
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Nyagah01-ops/galgitlery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'node server'
            }
            post {
                success {
                    slackSend channel: '#jenkins-notifications', color: 'good', message: "Build successful for ${env.JOB_NAME} (${env.BUILD_NUMBER})"
                }
                failure {
                    slackSend channel: '#jenkins-notifications', color: 'danger', message: "Build failed for ${env.JOB_NAME} (${env.BUILD_NUMBER})"
                }
            }
        }

        stage('Update Landing Page') {
            steps {
                script {
                    def file = readFile 'path/to/your/landing/page.html'
                    file = file.replace('<!-- MILESTONE_PLACEHOLDER -->', '<h1>MILESTONE 2</h1>')
                    writeFile file: 'path/to/your/landing/page.html', text: file
                }
            }
        }

        stage('Push Changes') {
            steps {
                sh 'git add .'
                sh 'git commit -m "Update landing page with MILESTONE 2"'
                sh 'git push origin main'
            }
            post {
                success {
                    slackSend channel: '#jenkins-notifications', color: 'good', message: "Changes pushed successfully for ${env.JOB_NAME} (${env.BUILD_NUMBER})"
                }
                failure {
                    slackSend channel: '#jenkins-notifications', color: 'danger', message: "Failed to push changes for ${env.JOB_NAME} (${env.BUILD_NUMBER})"
                }
            }
        }
    }

    post {
        always {
            slackSend channel: '#jenkins-notifications', color: 'warning', message: "Pipeline execution finished for ${env.JOB_NAME} (${env.BUILD_NUMBER})"
        }
    }
}
