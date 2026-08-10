output "vpc_id" {
  value       = aws_vpc.main.id
  description = "Created VPC ID"
}

output "postgres_endpoint" {
  value       = aws_db_instance.postgres.address
  description = "RDS endpoint"
}
