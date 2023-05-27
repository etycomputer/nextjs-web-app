-- CreateTable
CREATE TABLE "command_results" (
    "id" SERIAL NOT NULL,
    "error_code" INTEGER,
    "error_msg" TEXT,
    "command_id" INTEGER,
    "object_id" INTEGER,
    "time" TIMESTAMPTZ(6),

    CONSTRAINT "command_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drawpoints" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "z" DOUBLE PRECISION,

    CONSTRAINT "drawpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_settings" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "key_name" TEXT NOT NULL,
    "key_value" TEXT,
    "timestamp" TIMESTAMPTZ(6),
    "comments" TEXT,

    CONSTRAINT "global_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "parent_id" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marker_health_records" (
    "id" SERIAL NOT NULL,
    "marker_id" INTEGER NOT NULL,
    "time" TIMESTAMPTZ(6),
    "wor_count" INTEGER NOT NULL,
    "rx_count" INTEGER NOT NULL,
    "tx_count" INTEGER NOT NULL,
    "voltage" REAL,

    CONSTRAINT "marker_health_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marker_schedules" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6),
    "marker_id" INTEGER NOT NULL,
    "schedule_id" INTEGER,

    CONSTRAINT "marker_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markers" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "serial" TEXT,
    "hole_id" INTEGER,
    "subnet" INTEGER NOT NULL,
    "node" INTEGER NOT NULL,
    "activated" BOOLEAN,
    "activation_time" TIMESTAMPTZ(6),

    CONSTRAINT "markers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "object_groups" (
    "id" SERIAL NOT NULL,
    "object_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "object_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "object_settings" (
    "id" SERIAL NOT NULL,
    "object_id" INTEGER NOT NULL,
    "key_name" TEXT NOT NULL,
    "key_value" TEXT,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "object_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objects" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "serial" TEXT,
    "hole_id" INTEGER,

    CONSTRAINT "objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "z" DOUBLE PRECISION,
    "time" TIMESTAMPTZ(6),
    "object_id" INTEGER,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reader_antennas" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "serial" TEXT,
    "hole_id" INTEGER,
    "switch_number" INTEGER NOT NULL,
    "reader_id" INTEGER NOT NULL,

    CONSTRAINT "reader_antennas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reader_health_records" (
    "id" SERIAL NOT NULL,
    "reader_id" INTEGER NOT NULL,
    "time" TIMESTAMPTZ(6),
    "errors" TEXT,
    "supply_volts" REAL,
    "batt_volts" REAL,
    "power_source" INTEGER,
    "on_network" BOOLEAN,
    "last_network_time" TIMESTAMPTZ(6),

    CONSTRAINT "reader_health_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readers" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "serial" TEXT,
    "hole_id" INTEGER,
    "name" TEXT NOT NULL,
    "ip_address" TEXT,
    "port" INTEGER,
    "byte_offset" BIGINT,
    "last_read_time" TIMESTAMPTZ(6),

    CONSTRAINT "readers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_nodes" (
    "id" SERIAL NOT NULL,
    "object_id" INTEGER,
    "parent_id" INTEGER,
    "route_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "install_result_id" INTEGER,

    CONSTRAINT "route_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "root_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 0,
    "enabled_date" TIMESTAMPTZ(6),
    "disabled_date" TIMESTAMPTZ(6),
    "device_id" TEXT,
    "install_command_id" INTEGER,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rssi_readings" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMPTZ(6),
    "rssi" INTEGER,
    "origin_address" INTEGER,
    "response_address" INTEGER,

    CONSTRAINT "rssi_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_periods" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "start_time" TIME(6),
    "stop_time" TIME(6),

    CONSTRAINT "schedule_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_commands" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "scheduled_time" TIMESTAMPTZ(6),
    "executed_time" TIMESTAMPTZ(6),
    "object_id" INTEGER,
    "recurring_period" INTEGER,

    CONSTRAINT "scheduled_commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "active" BOOLEAN,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sms_reader_detections" (
    "id" SERIAL NOT NULL,
    "reader_serial" INTEGER NOT NULL,
    "marker_serial" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "marker_type" SMALLINT NOT NULL,
    "marker_rssi" INTEGER,
    "reader_rssi" INTEGER,

    CONSTRAINT "sms_reader_detections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tilt_readings" (
    "id" SERIAL NOT NULL,
    "marker_id" INTEGER NOT NULL,
    "time" TIMESTAMPTZ(6),
    "x_tilt" REAL,
    "y_tilt" REAL,
    "z_tilt" REAL,
    "x_mag" REAL,
    "y_mag" REAL,
    "z_mag" REAL,
    "temperature" REAL,
    "pressure" REAL,
    "format_type" SMALLINT,
    "temperature_pressure" REAL,

    CONSTRAINT "tilt_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attributes" (
    "id" SERIAL NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "attribute_comment" TEXT NOT NULL,
    "attribute_enabled" BOOLEAN NOT NULL,

    CONSTRAINT "user_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_configurations" (
    "id" SERIAL NOT NULL,
    "user_config_id" INTEGER NOT NULL,
    "config_name" TEXT NOT NULL,
    "comments" TEXT,
    "enabled" BOOLEAN NOT NULL,
    "settings" JSONB,
    "creation_time" TIMESTAMPTZ(6),

    CONSTRAINT "user_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "command_errors_command_index" ON "command_results"("command_id" ASC);

-- CreateIndex
CREATE INDEX "command_results_object_index" ON "command_results"("object_id" ASC, "time" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "drawpoints_name_key" ON "drawpoints"("name" ASC);

-- CreateIndex
CREATE INDEX "global_settings_group_key_time_index" ON "global_settings"("group_name" ASC, "key_name" ASC, "timestamp" ASC);

-- CreateIndex
CREATE INDEX "marker_health_time_index" ON "marker_health_records"("marker_id" ASC, "time" ASC);

-- CreateIndex
CREATE INDEX "settings_object_key_time_index" ON "object_settings"("object_id" ASC, "key_name" ASC, "timestamp" ASC);

-- CreateIndex
CREATE INDEX "object_hole_index" ON "objects"("hole_id" ASC);

-- CreateIndex
CREATE INDEX "positions_time_index" ON "positions"("object_id" ASC, "time" ASC);

-- CreateIndex
CREATE INDEX "reader_health_time_index" ON "reader_health_records"("reader_id" ASC, "time" ASC);

-- CreateIndex
CREATE INDEX "rssi_origin_time_index" ON "rssi_readings"("origin_address" ASC, "time" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "rssi_readings_time_origin_address_response_address_key" ON "rssi_readings"("time" ASC, "origin_address" ASC, "response_address" ASC);

-- CreateIndex
CREATE INDEX "rssi_response_time_index" ON "rssi_readings"("response_address" ASC, "time" ASC);

-- CreateIndex
CREATE INDEX "sms_reader_detections_time_index" ON "sms_reader_detections"("reader_serial" ASC, "marker_type" ASC, "timestamp" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tilt_readings_marker_id_time_key" ON "tilt_readings"("marker_id" ASC, "time" ASC);

-- CreateIndex
CREATE INDEX "tilt_time_index" ON "tilt_readings"("marker_id" ASC, "time" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "user_attributes_attribute_name_key" ON "user_attributes"("attribute_name" ASC);

