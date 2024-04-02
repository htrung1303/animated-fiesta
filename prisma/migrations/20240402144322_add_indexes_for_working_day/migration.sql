-- CreateIndex
CREATE INDEX "working_day_user_id_index" ON "WorkingDay"("userId");

-- CreateIndex
CREATE INDEX "working_day_user_id_check_in_time_index" ON "WorkingDay"("userId", "checkInTime");
