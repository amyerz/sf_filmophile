# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130830053457) do

  create_table "actors", :force => true do |t|
    t.string   "actor_name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "actors_movies", :force => true do |t|
    t.integer "actor_id"
    t.integer "movie_id"
  end

  create_table "answers", :force => true do |t|
    t.text     "content"
    t.integer  "question_id"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "genres", :force => true do |t|
    t.string   "genre"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "interviews", :force => true do |t|
    t.date     "date_called"
    t.time     "time_called"
    t.date     "date_interview"
    t.time     "time_interview"
    t.text     "address"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "phone"
    t.text     "notes"
    t.integer  "job_id"
    t.integer  "user_id"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "jobs", :force => true do |t|
    t.string   "job_title"
    t.text     "job_description"
    t.string   "job_post_url"
    t.string   "company_name"
    t.string   "company_url"
    t.date     "job_posted_date"
    t.date     "application_deadline"
    t.boolean  "applied"
    t.string   "job_type"
    t.date     "offer_date"
    t.float    "compensation"
    t.text     "benefits"
    t.integer  "user_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "doc"
    t.string   "doc_type"
    t.integer  "job_id"
  end

  create_table "locations", :force => true do |t|
    t.string   "address"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.text     "fun_fact"
    t.float    "latitude"
    t.float    "longitude"
  end

  create_table "locations_movies", :force => true do |t|
    t.integer "location_id"
    t.integer "movie_id"
  end

  create_table "movies", :force => true do |t|
    t.string   "movie_title"
    t.integer  "release_year"
    t.string   "director"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "people", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "job_title"
    t.integer  "peopletype_id"
    t.string   "email"
    t.string   "phone_num"
    t.string   "twitter"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "linkedin"
    t.integer  "user_id"
  end

  create_table "people_types", :force => true do |t|
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "question_categories", :force => true do |t|
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "question_sources", :force => true do |t|
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "questions", :force => true do |t|
    t.text     "content"
    t.integer  "interview_id"
    t.integer  "answer_id"
    t.integer  "source_id"
    t.integer  "category_id"
    t.integer  "user_id"
    t.boolean  "approved"
    t.boolean  "share"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "searches", :force => true do |t|
    t.string   "movies_title"
    t.string   "director"
    t.string   "genre"
    t.string   "address"
    t.integer  "release_year"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
