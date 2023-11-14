variable "region" {
  type        = string
  default     = "us-east-1"
  description = "AWS Region"
}

variable "namespace" {
  type        = string
  default     = "elloApp"
  description = "Namespace for the resources"
}

variable "stage" {
  type        = string
  default     = "test"
  description = "Stage for the resources"
}

variable "name" {
  type        = string
  default     = "elloApp"
  description = "Project Name"
}

variable "image_tag" {
  type        = string
  default     = "latest"
  description = "Docker image tag"
}

variable "container_port_mappings" {
  type = list(object({
    containerPort = number
    hostPort      = number
    protocol      = string
  }))
  default = [{
    containerPort = 3000
    hostPort      = 3000
    protocol      = "tcp"
  }]
  description = "The port mappings to configure for the container. This is a list of maps. Each map should contain \"containerPort\", \"hostPort\", and \"protocol\", where \"protocol\" is one of \"tcp\" or \"udp\". If using containers in a task with the awsvpc or host network mode, the hostPort can either be left blank or set to the same value as the containerPort"
}

variable "desired_count" {
  type = number
  description = "The number of instances of the task definition to place and keep running"
  default = 1
}