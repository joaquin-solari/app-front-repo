pipeline {

    environment {
         APP_NAME = "app-juaco"
        APP_TAG_ANT = "${BUILD_NUMBER} - 1"
        USER_APP = "joaquinsolari"
        PASS = "docker1608"
        GIT_REPO_APP= "https://github.com/joaquin-solari/app-repo.git"
        GIT_REPO_INFRA= "https://github.com/joaquin-solari/infra-repo.git"
    }

    agent {
       kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
  name: agent-pod
spec:
  containers:
  - name: agent-container
    image: tferrari92/jenkins-inbound-agent-git-npm-docker
    command:
    - sleep
    args:
    - "99"
    env:
    resources:
      limits: {}
      requests:
        memory: "256Mi"
        cpu: "100m"
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: volume-0
      readOnly: false
    - mountPath: /home/jenkins/agent
      name: workspace-volume
      readOnly: false
  hostNetwork: false
  nodeSelector:
    kubernetes.io/os: "linux"
  restartPolicy: Never
  volumes:
  - emptyDir:
      medium: ""
    name: workspace-volume
  - hostPath:
      path: /var/run/docker.sock
    name: volume-0
'''
            defaultContainer 'agent-container'
        }
    }
  
    stages {

        stage('Clonar repo') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: "$GIT_REPO_APP"
            }
        } 

        stage('Buildear imagen') {
            steps {
                sh "docker build -t $USER_APP/$APP_NAME:${BUILD_NUMBER} ." 
            }
        }

        stage('docker login') {
            steps {
                sh "docker login -u $USER_APP -p $PASS"
            }
        }

        stage('docker push') {
            steps {
                sh "docker push $USER_APP/$APP_NAME:${BUILD_NUMBER}"
            }
        } 

        stage('Clonar repo Infra') {
            steps {
                git branch: 'main', changelog: false, poll: false, credentialsId: 'jenkins' url: "$GIT_REPO_INFRA"
            }
        } 

        stage ('Modificar Dockerfile'){
            steps{
                sh "cd mi-app"
                sh"sed -i 's|joaquinsolari/app-juaco:$APP_TAG_ANT|joaquinsolari/app-juaco:${BUILD_NUMBER}|g' deploy-tomi.yaml"
            }
        }

        stage ('Pushear cambios'){
          steps{
             sh "git config --global user.email 'joaquin.solari@sendati.com'" 
             sh "git config --global user.name 'Joaquin Solari'"

              sh "git add ."
              sh "git commit -m 'Actualización a ${BUILD_NUMBER} en Deployment'"
              sh "git push"
          }
        }

    } 
}