variable "aws_region" {
  type        = string
  description = "AWS region for deployment"
  default     = "us-east-1"
}

variable "cluster_name" {
  type        = string
  description = "EKS cluster name"
  default     = "maitreya-broadcaster"
}

variable "db_username" {
  type        = string
  description = "RDS username"
  default     = "maitreya"
}

variable "db_password" {
  type        = string
  description = "RDS password"
  sensitive   = true
}
