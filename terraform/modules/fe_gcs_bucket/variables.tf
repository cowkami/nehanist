variable "env" {
  type = string
  description = "The environment to deploy to."
}

variable "project_id" {

  type = string
  description = "The Google Cloud project ID."
}

variable "location" {
  type = string
  description = "The location of the GCS bucket."
}
