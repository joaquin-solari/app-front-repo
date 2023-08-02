pipeline {

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
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/joaquin-solari/app-repo'
            }
        } 

        stage('Buildear imagen') {
            steps {
                sh "docker build -t joaquinsolari/app-juaco:${BUILD_NUMBER} ." 
            }
        }

        stage('docker login') {
            steps {
                sh "docker login -u joaquinsolari -p riverplate8090100"
            }
        }

        stage('docker push') {
            steps {
                sh "docker push joaquinsolari/app-juaco:${BUILD_NUMBER} "
            }
        } 
    } 
}